import { useState } from "react";
import { generateModerationItems, generateAppeals, type Appeal } from "@/lib/mock-data";
import ViolationBadge from "@/components/ViolationBadge";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye } from "lucide-react";

const modItems = generateModerationItems(80);
const appeals = generateAppeals(modItems);

export default function Appeals() {
  const [selected, setSelected] = useState<Appeal | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Appeal Handling</h1>
        <p className="text-sm text-muted-foreground">{appeals.length} appeals · Users contesting moderation decisions</p>
      </div>

      <div className="glass-card rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-medium">Appeal ID</th>
              <th className="px-4 py-3 text-left font-medium">Mod ID</th>
              <th className="px-4 py-3 text-left font-medium">User</th>
              <th className="px-4 py-3 text-left font-medium">Violation</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Submitted</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appeals.map((appeal) => (
              <tr key={appeal.id} className="border-b border-border/50 hover:bg-accent/40 transition-colors">
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{appeal.id}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{appeal.moderationId}</td>
                <td className="px-4 py-2.5 text-xs">{appeal.username}</td>
                <td className="px-4 py-2.5"><ViolationBadge type={appeal.violation} /></td>
                <td className="px-4 py-2.5"><StatusBadge status={appeal.status} /></td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">
                  {new Date(appeal.submittedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2.5">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setSelected(appeal)}>
                    <Eye className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">Appeal: {selected?.id}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <ViolationBadge type={selected.violation} />
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">User's Appeal Reason</p>
                <p className="text-xs leading-relaxed bg-muted/50 rounded-md p-3">{selected.reason}</p>
              </div>
              {(selected.status === "open" || selected.status === "under_review") && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Overturn
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-3.5 w-3.5 mr-1.5" /> Uphold
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
