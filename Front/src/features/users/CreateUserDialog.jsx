import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";
import { createUser } from "@/services/userService";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const userSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['intern', 'supervisor', 'administrator', 'internship coordinator']),
});

const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "intern" }
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully");
      queryClient.invalidateQueries(['users']);
      setOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to create user"),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-red hover:bg-red-700 text-white">
          <UserPlus className="mr-2 h-4 w-4 text-white" /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input {...register("firstname")} placeholder="Ahmed" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input {...register("lastname")} placeholder="Ben Ali" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="user@tunisair.com" />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select onValueChange={(val) => setValue("role", val)} defaultValue="intern">
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="internship coordinator">Coordinator</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input {...register("password")} type="password" />
          </div>

          <Button type="submit" className="w-full bg-slate-900" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;