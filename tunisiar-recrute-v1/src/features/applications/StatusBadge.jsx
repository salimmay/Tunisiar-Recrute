import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, FileSearch } from "lucide-react";

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || "pending";

  const styles = {
    pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
    approved: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
    accepted: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
    rejected: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
    reviewed: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
  };

  const icons = {
    pending: <Clock className="w-3.5 h-3.5 mr-1" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    accepted: <CheckCircle2 className="w-3.5 h-3.5 mr-1" />,
    rejected: <XCircle className="w-3.5 h-3.5 mr-1" />,
    reviewed: <FileSearch className="w-3.5 h-3.5 mr-1" />,
  };

  return (
    <Badge variant="outline" className={`px-3 py-1 font-medium ${styles[normalizedStatus] || styles.pending}`}>
      {icons[normalizedStatus] || icons.pending}
      {normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}
    </Badge>
  );
};

export default StatusBadge;