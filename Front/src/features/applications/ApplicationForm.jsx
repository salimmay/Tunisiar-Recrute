import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applyForInternship } from "@/services/applicationService";
import useAuthStore from "@/store/useAuthStore";

// Validation Schema
const applicationSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email(),
  university: z.string().min(2, "University is required"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  aboutYourself: z.string().optional(),
  // File validation is tricky in Zod client-side, we'll handle basic checks manually or assume FileList
});

const ApplicationForm = ({ offerId, onSuccess }) => {
  const user = useAuthStore((state) => state.user);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      email: user?.email || "",
    }
  });

  const mutation = useMutation({
    mutationFn: applyForInternship,
    onSuccess: () => {
      toast.success("Application Submitted!", {
        description: "Good luck! You can track your status in the dashboard."
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Submission Failed", {
        description: error.response?.data?.message || "Something went wrong."
      });
    }
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    
    // 1. Append text fields
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    
    // 2. Append Context IDs (THE FIX)
    formData.append("internshipOfferId", offerId);
    
    // Check multiple properties to find the ID (handles _id vs userId vs id)
    const uid = user?.userId || user?._id || user?.id;
    
    if (uid) {
      formData.append("userId", uid); // Backend strictly wants "userId"
    } else {
      toast.error("Session Error", { description: "User ID missing. Please log in again." });
      return; 
    }

    // 3. Append Files
    const resumeFile = document.getElementById("resume").files[0];
    const coverLetterFile = document.getElementById("coverLetter").files[0];

    if (!resumeFile) {
      toast.error("Resume is required");
      return;
    }

    formData.append("resume", resumeFile);
    if (coverLetterFile) formData.append("coverLetter", coverLetterFile);

    // 4. Submit
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" placeholder="e.g. 50 123 456" {...register("phoneNumber")} />
          {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="university">University / Institute</Label>
        <Input id="university" placeholder="e.g. ESPRIT, INSAT..." {...register("university")} />
        {errors.university && <p className="text-xs text-red-500">{errors.university.message}</p>}
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="resume">Resume (PDF)</Label>
          <Input id="resume" type="file" accept=".pdf,.doc,.docx" className="cursor-pointer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coverLetter">Cover Letter</Label>
          <Input id="coverLetter" type="file" accept=".pdf,.doc,.docx" className="cursor-pointer" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="aboutYourself">Why do you want this role?</Label>
        <Textarea 
          id="aboutYourself" 
          placeholder="Briefly describe your motivation..." 
          {...register("aboutYourself")} 
        />
      </div>

      <Button type="submit" className="w-full bg-brand-red hover:bg-red-700" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
};

export default ApplicationForm;