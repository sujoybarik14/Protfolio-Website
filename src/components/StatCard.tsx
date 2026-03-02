import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "warning" | "destructive" | "success";
}

const variantStyles = {
  default: "text-muted-foreground",
  primary: "text-primary",
  warning: "text-warning",
  destructive: "text-destructive",
  success: "text-success",
};

export default function StatCard({ label, value, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <div className="glass-card rounded-lg p-4 animate-slide-in">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <Icon className={cn("h-4 w-4", variantStyles[variant])} />
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      {trend && <p className="mt-1 text-xs text-muted-foreground">{trend}</p>}
    </div>
  );
}
