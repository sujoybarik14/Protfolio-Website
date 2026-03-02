import { biasData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { AlertTriangle } from "lucide-react";

const radarData = biasData.map(d => ({
  group: d.group,
  "Mod Rate": d.moderationRate,
  "FP Rate": d.falsePositiveRate,
  "Appeal Rate": d.appealRate / 5,
  "Overturn Rate": d.overturnRate / 10,
}));

export default function BiasMonitor() {
  const maxDiff = Math.max(...biasData.map(d => d.moderationRate)) - Math.min(...biasData.map(d => d.moderationRate));
  const hasAlert = maxDiff > 1.0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Bias Monitoring</h1>
        <p className="text-sm text-muted-foreground">Demographic parity analysis across moderation outcomes</p>
      </div>

      {hasAlert && (
        <div className="flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium text-warning">Disparity Alert</p>
            <p className="text-xs text-muted-foreground">
              Moderation rate variance of {maxDiff.toFixed(1)}% detected across demographic groups. Recommended threshold: &lt;1.0%
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Moderation Rate by Group (%)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={biasData}>
              <XAxis dataKey="group" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 7]} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="moderationRate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Multi-metric Radar</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="group" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Mod Rate" dataKey="Mod Rate" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} />
              <Radar name="FP Rate" dataKey="FP Rate" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.1} />
              <Radar name="Appeal Rate" dataKey="Appeal Rate" stroke="hsl(var(--warning))" fill="hsl(var(--warning))" fillOpacity={0.1} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card rounded-lg p-5">
        <h3 className="text-sm font-semibold mb-4">Detailed Metrics</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left font-medium">Group</th>
              <th className="px-4 py-3 text-left font-medium">Mod Rate</th>
              <th className="px-4 py-3 text-left font-medium">False Positive</th>
              <th className="px-4 py-3 text-left font-medium">Appeal Rate</th>
              <th className="px-4 py-3 text-left font-medium">Overturn Rate</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {biasData.map((row) => {
              const isHigh = row.moderationRate > 4.8;
              return (
                <tr key={row.group} className="border-b border-border/50">
                  <td className="px-4 py-2.5 font-medium">{row.group}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{row.moderationRate}%</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{row.falsePositiveRate}%</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{row.appealRate}%</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{row.overturnRate}%</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${isHigh ? "bg-warning/15 text-warning border-warning/20" : "bg-success/15 text-success border-success/20"}`}>
                      {isHigh ? "Review" : "Normal"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
