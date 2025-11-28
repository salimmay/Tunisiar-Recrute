import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllApplications, updateApplicationStatus } from "@/services/applicationService";
import { toast } from "sonner";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Check, X, FileText } from "lucide-react";
import StatusBadge from "@/features/applications/StatusBadge";

const ManageApplications = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: applications, isLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: getAllApplications,
  });

  // 2. Status Mutation
  const statusMutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (_, variables) => {
      toast.success(`Candidate ${variables.status === 'accepted' ? 'Accepted' : 'Rejected'}`);
      queryClient.invalidateQueries(['all-applications']);
    },
    onError: () => toast.error("Update failed"),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">Candidate Applications</h1>
        <p className="text-slate-500">Review, accept, or reject incoming applications.</p>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead>Candidate</TableHead>
              <TableHead>Internship Offer</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Decision</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : applications?.map((app) => (
              <TableRow key={app._id}>
                <TableCell>
                  <div className="font-medium">{app.firstName} {app.lastName}</div>
                  <div className="text-xs text-slate-500">{app.email}</div>
                </TableCell>
                <TableCell>
                  {/* Assuming backend populates offerDetails, otherwise display ID */}
                  {app.offerDetails?.title || "Internship Position"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {app.resume && (
                      <a href={app.resume} target="_blank" className="text-blue-600 hover:text-blue-800" title="Download Resume">
                        <FileText className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={app.status} />
                </TableCell>
                <TableCell className="text-right">
                  {app.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={() => statusMutation.mutate({ id: app._id, status: 'accepted' })}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => statusMutation.mutate({ id: app._id, status: 'rejected' })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {!isLoading && applications?.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No applications received yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApplications;