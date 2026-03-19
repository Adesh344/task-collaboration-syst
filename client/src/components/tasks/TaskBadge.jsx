import { statusColor, priorityColor, statusLabel } from "../../utils/helpers";

export const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(status)}`}>
    {statusLabel(status)}
  </span>
);

export const PriorityBadge = ({ priority }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColor(priority)}`}>
    {priority}
  </span>
);