import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Lock, Mail, ArrowLeft, Plane } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const authResponse = await api.post("/users/login", data);
      
      const token = authResponse.data.token || authResponse.data;
      const partialUser = authResponse.data.user || authResponse.data;
      const userId = partialUser.userId || partialUser._id || partialUser.id;

      if (!token || !userId) throw new Error("Invalid response from server");

      const profileResponse = await api.get(`/users/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const fullUserProfile = {
        ...partialUser,
        ...profileResponse.data,
        userId: userId,
        token: token
      };

      login(fullUserProfile, token);
      toast.success("Welcome back!", { description: `Hello, ${fullUserProfile.firstname || 'User'}!` });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login Failed", { description: error.response?.data?.message || "Could not verify credentials." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      
      {/* LEFT: Animated Background Image */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
          alt="Airplane Wing" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 p-12 text-white max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <div className="bg-brand-red w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-5xl font-display font-bold mb-4 leading-tight">Welcome Aboard.</h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Access the Tunisair recruitment portal to manage your applications, take assessments, and launch your career in aviation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center p-4 relative">
        
        {/* Back Button */}
        <Link to="/" className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl shadow-slate-200/50 border-0">
            <CardHeader className="space-y-1 text-center pb-8">
              <CardTitle className="text-3xl font-display font-bold text-slate-900">Sign In</CardTitle>
              <CardDescription className="text-slate-500">
                Enter your email and password to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                    <Input 
                      id="email" 
                      placeholder="name@example.com" 
                      className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" 
                      {...register("email")}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-sm text-red-500 font-medium">
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" class="text-xs font-medium text-brand-red hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-brand-red transition-colors" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 h-11 border-slate-200 focus-visible:ring-brand-red" 
                      {...register("password")}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-sm text-red-500 font-medium">
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <Button type="submit" className="w-full bg-brand-red hover:bg-red-700 h-11 text-base shadow-lg shadow-red-600/20" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center pb-8">
              <div className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-brand-red hover:underline font-bold">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;