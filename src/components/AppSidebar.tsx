import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, ListFilter, Scale, BarChart3, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/queue", icon: ListFilter, label: "Moderation Queue" },
  { to: "/appeals", icon: Scale, label: "Appeals" },
  { to: "/bias", icon: BarChart3, label: "Bias Monitor" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 glow-primary">
          <Shield className="h-4.5 w-4.5 text-primary" />
        </div>
        <span className="text-sm font-bold tracking-tight text-foreground">ModerateAI</span>
      </div>

      <nav className="mt-2 flex-1 space-y-0.5 px-3">
        {links.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-3">
        <p className="text-[11px] text-muted-foreground">v1.0 · Multilingual BERT + CNN</p>
      </div>
    </aside>
  );
}
