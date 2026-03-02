import { Activity, Clock, AlertTriangle, CheckCircle, Zap, Target, Scale, ShieldAlert } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import StatCard from "@/components/StatCard";
import { dashboardStats, violationBreakdown, volumeOverTime } from "@/lib/mock-data";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Moderation Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time content moderation overview</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Reviewed" value={dashboardStats.totalReviewed} icon={Activity} variant="primary" trend="+12.4% vs last week" />
        <StatCard label="Pending Queue" value={dashboardStats.pendingQueue} icon={Clock} variant="warning" trend="Avg wait: 2.3s" />
        <StatCard label="Auto-Approved" value={dashboardStats.autoApproved} icon={CheckCircle} variant="success" trend="91.9% auto-rate" />
        <StatCard label="Escalated" value={dashboardStats.escalated} icon={AlertTriangle} variant="destructive" trend="1.4% escalation rate" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="AI Accuracy" value={`${dashboardStats.accuracy}%`} icon={Target} variant="primary" />
        <StatCard label="Avg Response" value={dashboardStats.avgResponseTime} icon={Zap} variant="success" />
        <StatCard label="Open Appeals" value={dashboardStats.appealsOpen} icon={Scale} variant="warning" />
        <StatCard label="Bias Alerts" value={dashboardStats.biasAlerts} icon={ShieldAlert} variant="destructive" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Content Volume (14 days)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={volumeOverTime}>
              <defs>
                <linearGradient id="gReviewed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="reviewed" stroke="hsl(var(--primary))" fill="url(#gReviewed)" strokeWidth={2} />
              <Area type="monotone" dataKey="flagged" stroke="hsl(var(--warning))" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
              <Area type="monotone" dataKey="escalated" stroke="hsl(var(--destructive))" fill="none" strokeWidth={1.5} strokeDasharray="2 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-4">Violation Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={violationBreakdown} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                {violationBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {violationBreakdown.map((v) => (
              <div key={v.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ background: v.fill }} />
                  <span className="text-muted-foreground">{v.name}</span>
                </div>
                <span className="font-mono">{v.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
