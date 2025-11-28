import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Search, Shield, User, Mail, Lock, Loader2 } from "lucide-react";

import { getAllUsers, deleteUser } from "@/services/userService";
import PageContainer from "@/components/shared/PageContainer";
import CreateUserDialog from "@/features/users/CreateUserDialog";

import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Delete State
  const [userToDelete, setUserToDelete] = useState(null); // Stores the user object
  const [adminPassword, setAdminPassword] = useState(""); // Stores input password

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User account deleted successfully");
      queryClient.invalidateQueries(['users']);
      closeDeleteModal();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Incorrect password or permission denied");
    },
  });

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setAdminPassword("");
    deleteMutation.reset();
  };

  const handleDeleteSubmit = () => {
    if (!adminPassword) {
      toast.error("Please enter your password to confirm");
      return;
    }
    deleteMutation.mutate({ id: userToDelete._id, password: adminPassword });
  };

  // Filter Logic
  const filteredUsers = users?.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const email = user.email.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || email.includes(term);
  });

  const getRoleBadge = (role) => {
    const styles = {
      administrator: "bg-purple-100 text-purple-700 border-purple-200",
      supervisor: "bg-orange-100 text-orange-700 border-orange-200",
      "internship coordinator": "bg-blue-100 text-blue-700 border-blue-200",
      intern: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return styles[role] || styles.intern;
  };

  return (
    <PageContainer className="space-y-8">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Create accounts and manage system access.</p>
        </div>
        <CreateUserDialog />
      </div>

      {/* --- Search Bar --- */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search users..." 
          className="pl-10 bg-white shadow-sm border-slate-200 focus:border-brand-red focus:ring-brand-red"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- Data Table --- */}
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[40%] pl-6">User Profile</TableHead>
              <TableHead className="w-[25%]">Role</TableHead>
              <TableHead className="w-[25%]">Contact</TableHead>
              <TableHead className="w-[10%] text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell className="pl-6"><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full bg-slate-200" /><div className="space-y-2"><Skeleton className="h-4 w-32 bg-slate-200" /><Skeleton className="h-3 w-20 bg-slate-200" /></div></div></TableCell>
                  <TableCell><Skeleton className="h-6 w-24 rounded-full bg-slate-200" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40 bg-slate-200" /></TableCell>
                  <TableCell className="pr-6"><Skeleton className="h-8 w-8 ml-auto bg-slate-200" /></TableCell>
                </TableRow>
              ))
            ) : filteredUsers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                  No users found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers?.map((user) => (
                <TableRow key={user._id} className="group hover:bg-slate-50/50 transition-colors">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`} />
                        <AvatarFallback className="bg-slate-100 font-bold text-slate-600">
                          {user.firstname?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{user.firstname} {user.lastname}</p>
                        <p className="text-xs text-slate-500 font-mono">ID: {user._id.slice(-6)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`capitalize font-medium shadow-sm ${getRoleBadge(user.role)}`}>
                      {user.role === 'administrator' && <Shield className="h-3 w-3 mr-1.5" />}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setUserToDelete(user)}
                      disabled={user.role === 'administrator'} // Optional: Prevent deleting other admins
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* --- Security Deletion Modal --- */}
      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && closeDeleteModal()}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Security Verification
            </DialogTitle>
            <DialogDescription>
              To delete the user <b>{userToDelete?.firstname} {userToDelete?.lastname}</b>, please enter your administrator password.
              <br/><br/>
              <span className="text-red-600 font-medium bg-red-50 px-2 py-1 rounded text-xs">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="admin-pass">Admin Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input 
                  id="admin-pass" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDeleteSubmit()}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteSubmit}
              disabled={deleteMutation.isPending || !adminPassword}
            >
              {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </PageContainer>
  );
};

export default ManageUsers;