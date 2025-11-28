import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, User, ArrowRight,ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password
      };

      await api.post("/users/signup", payload);
      
      toast.success("Account Created Successfully!", { description: "Please sign in to continue." });
      navigate("/login");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error("Error", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-row-reverse">
      
      {/* RIGHT: Animated Background Image (Reversed position for Register) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2070&auto=format&fit=crop" 
          alt="Airport Terminal" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 p-12 text-white max-w-xl text-right">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-5xl font-display font-bold mb-4 leading-tight">Start Your Journey.</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Join the Tunisair team. Create your profile to browse internships, access workshops, and apply for positions instantly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* LEFT: Register Form */}
      <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center p-4 relative">
        
        {/* Back Button */}
        <Link to="/" className="absolute top-8 right-8 lg:left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg"
        >
          <Card className="shadow-2xl shadow-slate-200/50 border-0">
            <CardHeader className="space-y-1 text-center pb-8">
              <CardTitle className="text-3xl font-display font-bold text-slate-900">Create Account</CardTitle>
              <CardDescription>
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                      <Input id="firstName" placeholder="Ahmed" className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" {...register("firstName")} />
                    </div>
                    <AnimatePresence>{errors.firstName && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium">{errors.firstName.message}</motion.p>}</AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                      <Input id="lastName" placeholder="Ben Ali" className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" {...register("lastName")} />
                    </div>
                    <AnimatePresence>{errors.lastName && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium">{errors.lastName.message}</motion.p>}</AnimatePresence>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" {...register("email")} />
                  </div>
                  <AnimatePresence>{errors.email && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium">{errors.email.message}</motion.p>}</AnimatePresence>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                      <Input id="password" type="password" placeholder="••••••" className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" {...register("password")} />
                    </div>
                    <AnimatePresence>{errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium">{errors.password.message}</motion.p>}</AnimatePresence>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                      <Input id="confirmPassword" type="password" placeholder="••••••" className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" {...register("confirmPassword")} />
                    </div>
                    <AnimatePresence>{errors.confirmPassword && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 font-medium">{errors.confirmPassword.message}</motion.p>}</AnimatePresence>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 h-11 text-base group" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (
                    <span className="flex items-center gap-2">Create Account <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center pb-8">
              <div className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-red hover:underline font-bold">
                  Sign In
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;