import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Search, User } from "lucide-react";

import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
import PageContainer from "@/components/shared/PageContainer";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Robust fetcher that handles both Populated Objects and Raw IDs
const getMyInterns = async (supervisorId) => {
  const response = await api.get(`/users/user/${supervisorId}`);
  const list = response.data.supervisedInterns || [];

  if (list.length === 0) return [];

  // Check if the list contains Strings (IDs) or Objects
  const isListOfIds = typeof list[0] === "string";

  if (isListOfIds) {
    // If they are just IDs, we must fetch the user details for each one
    const requests = list.map((id) => api.get(`/users/user/${id}`).then(res => res.data));
    const detailedInterns = await Promise.all(requests);
    return detailedInterns;
  }

  // If already populated objects
  return list;
};

const MyInterns = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.userId || user?._id;
  const [searchTerm, setSearchTerm] = useState("");

  const { data: interns, isLoading } = useQuery({
    queryKey: ['my-interns', userId],
    queryFn: () => getMyInterns(userId),
    enabled: !!userId,
  });

  // Filter Logic
  const filteredInterns = interns?.filter(intern => {
    if (!intern) return false;
    const fullName = `${intern.firstname || intern.firstName || ''} ${intern.lastname || intern.lastName || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || (intern.email || "").toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  return (
    <PageContainer className="space-y-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">My Interns</h1>
          <p className="text-slate-500">Manage the interns currently under your supervision.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search interns..." 
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : filteredInterns.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed rounded-xl bg-slate-50/50">
          <div className="bg-white p-4 rounded-full w-fit mx-auto mb-4 shadow-sm">
            <User className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No interns found</h3>
          <p className="text-slate-500">You don't have any active interns matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInterns.map((intern) => {
            // Safety first: Handle missing data gracefully
            const fname = intern.firstname || intern.firstName || "Unknown";
            const lname = intern.lastname || intern.lastName || "Intern";
            const email = intern.email || "No email provided";

            return (
              <Card key={intern._id} className="hover:shadow-lg transition-all duration-300 group border-slate-200">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <Avatar className="h-14 w-14 border-4 border-white shadow-sm ring-1 ring-slate-100">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${fname}+${lname}&background=random`} />
                    <AvatarFallback className="bg-slate-900 text-white font-bold">{fname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <CardTitle className="text-lg font-bold text-slate-900 truncate">
                      {fname} {lname}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-1 text-xs bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
                      Active Intern
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 bg-slate-50/50 py-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="truncate" title={email}>{email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Tunis-Carthage HQ</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
};

export default MyInterns;