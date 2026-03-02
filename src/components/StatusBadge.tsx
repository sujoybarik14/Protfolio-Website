import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  pending: "bg-warning/15 text-warning border-warning/20",
  approved: "bg-success/15 text-success border-success/20",
  rejected: "bg-destructive/15 text-destructive border-destructive/20",
  escalated: "bg-info/15 text-info border-info/20",
  open: "bg-warning/15 text-warning border-warning/20",
  under_review: "bg-info/15 text-info border-info/20",
  upheld: "bg-destructive/15 text-destructive border-destructive/20",
  overturned: "bg-success/15 text-success border-success/20",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize", styles[status] || styles.pending)}>
      {status.replace("_", " ")}
    </span>
  );
}
