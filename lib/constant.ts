import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  CircleDotDashed,
  LucideIcon,
  XCircle,
  MoreHorizontal,
  ShieldAlert,
  Signal,
  SignalLow,
  SignalMedium,
  CircleArrowOutUpRight,
} from "lucide-react";

export type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export const statuses: Status[] = [
  {
    value: "future",
    label: "Future",
    icon: CircleDotDashed,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
  {
    value: "in review",
    label: "In Review",
    icon: CircleArrowOutUpRight,
  },
];

export type Priority = {
  value: string;
  label: string;
  icon: LucideIcon;
  id?: number;
};

export const priorities: Priority[] = [
  {
    id: 1,
    value: "no priority",
    label: "No Priority",
    icon: MoreHorizontal,
  },
  {
    id: 2,
    value: "urgent",
    label: "Urgent",
    icon: ShieldAlert,
  },
  {
    id: 3,
    value: "high",
    label: "High",
    icon: Signal,
  },
  {
    id: 4,
    value: "medium",
    label: "Medium",
    icon: SignalMedium,
  },
  {
    id: 5,
    value: "low",
    label: "Low",
    icon: SignalLow,
  },
];
