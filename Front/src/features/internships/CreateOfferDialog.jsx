import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Edit, Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const offerSchema = z.object({
  title: z.string().min(3, "Title is required"),
  department: z.string().min(2, "Department is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description is too short"),
});

// Now accepts 'open', 'onOpenChange', and 'offerToEdit' from the parent
const CreateOfferDialog = ({ children, open, onOpenChange, offerToEdit }) => {
  // Internal state for when used standalone (optional)
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use parent control if provided, otherwise internal
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      description: ""
    }
  });

  // 1. Effect: Pre-fill form when editing
  useEffect(() => {
    if (offerToEdit) {
      setValue("title", offerToEdit.title);
      setValue("department", offerToEdit.department);
      setValue("location", offerToEdit.location);
      setValue("description", offerToEdit.description);
    } else {
      reset(); // Clear form if adding new
    }
  }, [offerToEdit, isOpen, setValue, reset]);

  // 2. Mutation (Handles both Create and Update)
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (offerToEdit) {
        // UPDATE existing
        await api.put(`/internshipOffers/${offerToEdit._id}`, data);
      } else {
        // CREATE new
        await api.post("/internshipOffers", { ...data, icon: "default_icon_url" });
      }
    },
    onSuccess: () => {
      toast.success(offerToEdit ? "Offer Updated" : "Offer Created");
      queryClient.invalidateQueries(['internships']);
      setIsOpen(false);
      reset();
    },
    onError: () => toast.error("Operation failed"),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Only render trigger if we have children (the button) */}
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {offerToEdit ? "Edit Internship Offer" : "Create New Internship"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="e.g. Software Engineer Intern" {...register("title")} />
            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Input placeholder="IT" {...register("department")} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="Tunis" {...register("location")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Job details..." className="h-32" {...register("description")} />
            {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-brand-red hover:bg-red-700" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {offerToEdit ? "Save Changes" : "Create Offer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferDialog;