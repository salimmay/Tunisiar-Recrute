import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Trash2, Edit, Plus, MoreHorizontal, Search, MapPin, Building2, BookOpen 
} from "lucide-react";

import api from "@/lib/axios";
import { getInternships } from "@/services/internshipService";
import PageContainer from "@/components/shared/PageContainer";
import CreateOfferDialog from "@/features/internships/CreateOfferDialog";

import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ManageOffers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  // Local State
  const [searchTerm, setSearchTerm] = useState("");
  const [offerToDelete, setOfferToDelete] = useState(null); // Tracks which ID to delete
  const [offerToEdit, setOfferToEdit] = useState(null);     // Tracks which offer to edit
  const [isDialogOpen, setIsDialogOpen] = useState(false);  // Controls Create/Edit dialog

  // 1. Fetch Offers
  const { data: offers, isLoading } = useQuery({
    queryKey: ['internships'],
    queryFn: getInternships,
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/internshipOffers/${id}`);
    },
    onSuccess: () => {
      toast.success("Offer deleted successfully");
      queryClient.invalidateQueries(['internships']);
      setOfferToDelete(null); // Close alert
    },
    onError: () => toast.error("Failed to delete offer"),
  });

  // Filter Logic
  const filteredOffers = offers?.filter(offer => 
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (offer) => {
    setOfferToEdit(offer);
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setOfferToEdit(null); // Reset for new offer
    setIsDialogOpen(true);
  };

  return (
    <PageContainer className="space-y-8">
      
      {/* --- Header & Actions --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center  gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Manage Offers</h1>
          <p className="text-slate-500">Create, edit, or remove internship positions.</p>
        </div>
        
        {/* Reuse the Dialog for Create AND Edit */}
        <CreateOfferDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
          offerToEdit={offerToEdit} // We need to update CreateOfferDialog to accept this prop
        >
          <Button onClick={handleCreateClick} className="bg-brand-red hover:bg-red-700 shadow-lg shadow-red-600/20">
            <Plus className="mr-2 h-4 w-4" /> Create Offer
          </Button>
        </CreateOfferDialog>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search by title or department..." 
          className="pl-10 bg-white border-slate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- Data Table --- */}
      <div className="border rounded-xl bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 ">
              <TableHead className="w-[350px]">Position Details</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1,2,3].map(i => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-12 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : filteredOffers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                  No offers found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredOffers?.map((offer) => (
                <TableRow key={offer._id} className="group">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-base">{offer.title}</span>
                      <span className="text-sm text-slate-500 flex items-center gap-1">
                        <Building2 className="h-3 w-3" /> {offer.department}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {offer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white">
                        <DropdownMenuLabel>Manage Offer</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem onClick={() => handleEditClick(offer)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4 text-blue-600" /> Edit Details
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/offers/${offer._id}/quiz`)} className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4 text-purple-600" /> Quiz Builder
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem 
                          className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-700"
                          onClick={() => setOfferToDelete(offer._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Offer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- Delete Alert Dialog --- */}
      <AlertDialog open={!!offerToDelete} onOpenChange={() => setOfferToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the internship offer and remove it from the public board.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteMutation.mutate(offerToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </PageContainer>
  );
};

export default ManageOffers;