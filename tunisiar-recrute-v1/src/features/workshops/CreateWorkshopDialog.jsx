import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Calendar, Video, User, CheckCircle2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Validation Schema
const workshopSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  date: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Date must be in the future",
  }),
  meetLink: z.string().url("Must be a valid URL"),
  attendees: z.array(z.string()).min(1, "Select at least one attendee"),
});

const CreateWorkshopDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // 1. Fetch Potential Attendees (Approved Interns)
  const { data: interns, isLoading: isLoadingInterns } = useQuery({
    queryKey: ['approved-interns'],
    queryFn: async () => {
      // Adjust endpoint based on your backend logic for fetching available interns
      const res = await api.get("/applications?supervisionStatus=approved");
      return res.data;
    },
    enabled: open, // Only fetch when modal opens
  });

  // 2. Form Setup
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      title: "",
      description: "",
      meetLink: "",
      attendees: []
    }
  });

  const selectedAttendees = watch("attendees");

  // 3. Toggle Logic for Attendee Selection
  const toggleAttendee = (userId) => {
    const current = selectedAttendees || [];
    if (current.includes(userId)) {
      setValue("attendees", current.filter(id => id !== userId));
    } else {
      setValue("attendees", [...current, userId]);
    }
  };

  // 4. Create Mutation
  const mutation = useMutation({
    mutationFn: async (data) => await api.post("/workshops", data),
    onSuccess: () => {
      toast.success("Workshop Scheduled Successfully");
      queryClient.invalidateQueries(['workshops']);
      setOpen(false);
      reset();
    },
    onError: () => toast.error("Failed to schedule workshop"),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-red hover:bg-red-700">
          <Plus className="mr-2 h-4 w-4" /> Schedule Workshop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Schedule New Workshop</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4 flex-1 overflow-y-auto p-1">
          
          {/* Title */}
          <div className="space-y-2">
            <Label>Topic / Title</Label>
            <Input placeholder="e.g. Safety Protocols Training" {...register("title")} />
            {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="What will be covered?" {...register("description")} />
            {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
          </div>

          {/* Logistics Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input type="datetime-local" className="pl-10" {...register("date")} />
              </div>
              {errors.date && <span className="text-xs text-red-500">{errors.date.message}</span>}
            </div>
            <div className="space-y-2">
              <Label>Meeting Link</Label>
              <div className="relative">
                <Video className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input placeholder="https://meet.google.com/..." className="pl-10" {...register("meetLink")} />
              </div>
              {errors.meetLink && <span className="text-xs text-red-500">{errors.meetLink.message}</span>}
            </div>
          </div>

          {/* Attendee Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Select Attendees</Label>
              <span className="text-xs text-slate-500">
                {selectedAttendees?.length} selected
              </span>
            </div>
            
            <div className="border rounded-lg bg-slate-50 h-48 overflow-y-auto p-2">
              {isLoadingInterns ? (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  Loading interns...
                </div>
              ) : interns?.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  No approved interns found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interns?.map((intern) => {
                    const isSelected = selectedAttendees?.includes(intern.userId || intern._id); // Handle ID variations
                    return (
                      <div
                        key={intern._id}
                        onClick={() => toggleAttendee(intern.userId || intern._id)}
                        className={`
                          flex items-center gap-3 p-2 rounded-md cursor-pointer border transition-all
                          ${isSelected 
                            ? "bg-white border-brand-red ring-1 ring-brand-red shadow-sm" 
                            : "bg-white border-transparent hover:border-slate-300"
                          }
                        `}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${intern.firstName}+${intern.lastName}&background=random`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium truncate text-slate-900">
                            {intern.firstName} {intern.lastName}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{intern.department || "Intern"}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-brand-red" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {errors.attendees && <span className="text-xs text-red-500">{errors.attendees.message}</span>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-brand-red hover:bg-red-700" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Schedule Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkshopDialog;