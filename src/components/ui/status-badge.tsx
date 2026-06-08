import { cn } from "@/lib/utils";
import type { ReservationStatus } from "@/lib/types";

const statusConfig: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-100 text-amber-800",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800",
  },
  checked_in: {
    label: "Checked In",
    className: "bg-blue-100 text-blue-800",
  },
  checked_out: {
    label: "Checked Out",
    className: "bg-gray-100 text-gray-600",
  },
};

export function StatusBadge({ status }: { status: ReservationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
