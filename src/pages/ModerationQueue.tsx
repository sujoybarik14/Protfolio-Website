import { useState, useMemo } from "react";
import { generateModerationItems, langLabels, type ModerationItem, type ViolationType, type ModerationStatus } from "@/lib/mock-data";
import ViolationBadge from "@/components/ViolationBadge";
import StatusBadge from "@/components/StatusBadge";
import ConfidenceMeter from "@/components/ConfidenceMeter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, FileText, ImageIcon, Video, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const items = generateModerationItems(80);
const contentIcons = { text: FileText, image: ImageIcon, video: Video };

export default function ModerationQueue() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [violationFilter, setViolationFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ModerationItem | null>(null);

  const filtered = useMemo(() =>
    items.filter(i =>
      (statusFilter === "all" || i.status === statusFilter) &&
      (violationFilter === "all" || i.violation === violationFilter)
    ), [statusFilter, violationFilter]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Moderation Queue</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} items · AI-powered screening with human escalation</p>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={violationFilter} onValueChange={setViolationFilter}>
            <SelectTrigger className="w-36 h-8 text-xs"><SelectValue placeholder="Violation" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Violations</SelectItem>
              <SelectItem value="hate_speech">Hate Speech</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="adult_content">Adult Content</SelectItem>
              <SelectItem value="violence">Violence</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="glass-card rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">User</th>
              <th className="px-4 py-3 text-left font-medium">Platform</th>
              <th className="px-4 py-3 text-left font-medium">Lang</th>
              <th className="px-4 py-3 text-left font-medium">Violation</th>
              <th className="px-4 py-3 text-left font-medium">Confidence</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 30).map((item) => {
              const Icon = contentIcons[item.contentType];
              return (
                <tr key={item.id} className="border-b border-border/50 hover:bg-accent/40 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{item.id}</td>
                  <td className="px-4 py-2.5"><Icon className="h-3.5 w-3.5 text-muted-foreground" /></td>
                  <td className="px-4 py-2.5 text-xs">{item.username}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{item.platform}</td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{langLabels[item.language]}</td>
                  <td className="px-4 py-2.5"><ViolationBadge type={item.violation} /></td>
                  <td className="px-4 py-2.5"><ConfidenceMeter value={item.aiConfidence} /></td>
                  <td className="px-4 py-2.5"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setSelected(item)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      {item.status === "pending" || item.status === "escalated" ? (
                        <>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-success hover:text-success">
                            <CheckCircle className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive">
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Review: {selected?.id}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <ViolationBadge type={selected.violation} />
                <StatusBadge status={selected.status} />
                <ConfidenceMeter value={selected.aiConfidence} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">AI Reasoning</p>
                <p className="text-xs leading-relaxed bg-muted/50 rounded-md p-3">{selected.aiReasoning}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted-foreground">User:</span> {selected.username}</div>
                <div><span className="text-muted-foreground">Platform:</span> {selected.platform}</div>
                <div><span className="text-muted-foreground">Language:</span> {langLabels[selected.language]}</div>
                <div><span className="text-muted-foreground">Type:</span> {selected.contentType}</div>
              </div>
              {(selected.status === "pending" || selected.status === "escalated") && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-3.5 w-3.5 mr-1.5" /> Reject
                  </Button>
                  <Button size="sm" variant="outline">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1.5" /> Escalate
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
