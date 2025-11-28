import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { getUserApplications } from "@/services/applicationService";
import StatusBadge from "@/features/applications/StatusBadge";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Building, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const user = useAuthStore((state) => state.user);

  const { data: applications, isLoading, isError } = useQuery({
    queryKey: ['my-applications', user?.userId],
    queryFn: () => getUserApplications(user?.userId), // Assumes user object has userId
    enabled: !!user?.userId, // Only run if user exists
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900">My Applications</h1>
        <p className="text-slate-500">Track the progress of your candidacies.</p>
      </div>

      {isLoading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200">
          Failed to load your applications.
        </div>
      )}

      {!isLoading && !isError && applications?.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">No applications yet</h3>
          <p className="text-slate-500 mb-6">You haven't applied to any internships.</p>
          <Button asChild>
            <Link to="/dashboard/internships">Browse Offers</Link>
          </Button>
        </div>
      )}

      <div className="grid gap-4">
        {applications?.map((app) => (
          <Card key={app._id} className="hover:shadow-md transition-shadow border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              
              <CardHeader className="pb-2 md:pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <StatusBadge status={app.status} />
                  <span className="text-xs text-slate-400 font-mono">ID: {app._id.slice(-6)}</span>
                </div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  {/* Ideally, populate this from backend, or fetch offer details */}
                  {app.offerDetails?.title || "Internship Application"}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5" />
                  {app.department || "General Department"}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2 md:pb-6 md:text-right">
                <div className="flex items-center gap-2 text-sm text-slate-500 md:justify-end">
                  <Calendar className="h-4 w-4" />
                  Applied on {new Date().toLocaleDateString()} 
                  {/* Replace 'new Date()' with app.createdAt if available */}
                </div>
              </CardContent>

              <CardFooter className="pt-0 md:pt-6 md:border-l border-slate-100 flex items-center justify-end">
                {app.status === 'accepted' ? (
                   <Button size="sm" className="bg-green-600 hover:bg-green-700">
                     Take Quiz
                   </Button>
                ) : (
                   <Button variant="ghost" size="sm" className="text-slate-500">
                     View Details <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;