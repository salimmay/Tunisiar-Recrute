import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { User, Lock, Bell, Save, Loader2, Camera, Shield } from "lucide-react";
import { motion } from "framer-motion";

import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
import PageContainer from "@/components/shared/PageContainer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// --- Validation Schemas ---
const generalSchema = z.object({
  firstname: z.string().min(2, "First name required"),
  lastname: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email").optional(), // Email usually readonly
});

const securitySchema = z.object({
  currentPassword: z.string().min(6, "Required"),
  newPassword: z.string().min(6, "Must be 6+ chars"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ProfileSettings = () => {
  const { user, login } = useAuthStore(); // We use login() to update the local user object after save
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");

  // --- 1. General Form ---
  const { register: regGen, handleSubmit: subGen, formState: { errors: errGen, isSubmitting: loadGen } } = useForm({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
    }
  });

  // --- 2. Security Form ---
  const { register: regSec, handleSubmit: subSec, reset: resetSec, formState: { errors: errSec, isSubmitting: loadSec } } = useForm({
    resolver: zodResolver(securitySchema)
  });

  // Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      // Determine ID based on storage structure
      const id = user.userId || user._id;
      await api.put(`/users/user/${id}`, data);
      return data;
    },
    onSuccess: (newData) => {
      toast.success("Profile Updated Successfully");
      // Update Local State
      login({ ...user, ...newData }, localStorage.getItem('token'));
      queryClient.invalidateQueries(['user-profile']);
      if (activeTab === 'security') resetSec();
    },
    onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
  });

  return (
    <PageContainer className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your personal information and security preferences.</p>
        </div>
        
        {/* Role Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
          <Shield className="h-4 w-4 text-brand-red" />
          <span className="text-sm font-medium capitalize text-slate-700">
            Role: <span className="font-bold text-slate-900">{user?.role}</span>
          </span>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="md:w-64 flex-shrink-0">
          <TabsList className="flex flex-col h-auto w-full bg-transparent gap-2 p-0">
            <TabsTrigger 
              value="general" 
              className="w-full justify-start px-4 py-3 data-[state=active]:bg-brand-red data-[state=active]:text-white rounded-lg transition-all"
            >
              <User className="mr-2 h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="w-full justify-start px-4 py-3 data-[state=active]:bg-brand-red data-[state=active]:text-white rounded-lg transition-all"
            >
              <Lock className="mr-2 h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              disabled 
              className="w-full justify-start px-4 py-3 opacity-50 cursor-not-allowed"
            >
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            
            {/* === GENERAL TAB === */}
            <TabsContent value="general" className="mt-0 space-y-6">
              
              {/* Avatar Section */}
              <Card>
                <CardContent className="p-6 flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=0F172A&color=fff&size=128`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 bg-brand-red text-white rounded-full hover:bg-red-700 transition-colors shadow-sm">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Profile Picture</h3>
                    <p className="text-sm text-slate-500">This will be visible to your supervisors.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Form Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your public profile details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={subGen((data) => updateProfileMutation.mutate(data))} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input {...regGen("firstname")} />
                        {errGen.firstname && <span className="text-xs text-red-500">{errGen.firstname.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input {...regGen("lastname")} />
                        {errGen.lastname && <span className="text-xs text-red-500">{errGen.lastname.message}</span>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input {...regGen("email")} disabled className="bg-slate-50 text-slate-500 cursor-not-allowed" />
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="bg-slate-900" disabled={loadGen}>
                        {loadGen ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* === SECURITY TAB === */}
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Security</CardTitle>
                  <CardDescription>Ensure your account is using a strong password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={subSec((data) => updateProfileMutation.mutate(data))} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" {...regSec("currentPassword")} />
                      {errSec.currentPassword && <span className="text-xs text-red-500">{errSec.currentPassword.message}</span>}
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" {...regSec("newPassword")} />
                        {errSec.newPassword && <span className="text-xs text-red-500">{errSec.newPassword.message}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" {...regSec("confirmPassword")} />
                        {errSec.confirmPassword && <span className="text-xs text-red-500">{errSec.confirmPassword.message}</span>}
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loadSec}>
                        {loadSec ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

          </motion.div>
        </div>
      </Tabs>
    </PageContainer>
  );
};

export default ProfileSettings;