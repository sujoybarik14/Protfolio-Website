import { cn } from "@/lib/utils";
import type { ViolationType } from "@/lib/mock-data";
import { violationLabels } from "@/lib/mock-data";

const styles: Record<ViolationType, string> = {
  hate_speech: "bg-destructive/15 text-destructive border-destructive/20",
  harassment: "bg-warning/15 text-warning border-warning/20",
  adult_content: "bg-destructive/15 text-destructive border-destructive/20",
  violence: "bg-destructive/15 text-destructive border-destructive/20",
  spam: "bg-info/15 text-info border-info/20",
  none: "bg-success/15 text-success border-success/20",
};

export default function ViolationBadge({ type }: { type: ViolationType }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", styles[type])}>
      {violationLabels[type]}
    </span>
  );
}
