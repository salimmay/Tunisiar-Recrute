import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle2, Loader2, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Replace with actual API call: await api.post('/users/forgot-password', data);
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      setIsSubmitted(true);
      toast.success("Reset link sent!", { description: "Check your inbox for instructions." });
    } catch (error) {
      toast.error("Error", { description: "Could not send reset link. Please try again." });
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
          src="https://images.unsplash.com/photo-1520437358207-323b43b50729?q=80&w=2070&auto=format&fit=crop" 
          alt="Sky View" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 p-12 text-white max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/20">
              <ShieldQuestion className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-5xl font-display font-bold mb-4 leading-tight">Account Recovery.</h2>
            <p className="text-lg text-slate-200 leading-relaxed">
              Lost your way? Don't worry. We'll help you get back on the flight path in no time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: Form Section */}
      <div className="w-full lg:w-1/2 bg-slate-50 flex items-center justify-center p-4 relative">
        
        {/* Back Button */}
        <Link to="/login" className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors group">
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all border border-slate-200">
             <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium">Back to Login</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl shadow-slate-200/50 border-0 overflow-hidden">
            <AnimatePresence mode="wait">
              
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <CardHeader className="space-y-1 text-center pb-6">
                    <CardTitle className="text-3xl font-display font-bold text-slate-900">Forgot Password?</CardTitle>
                    <CardDescription className="text-slate-500">
                      Enter your email address to receive reset instructions.
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
                            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="text-xs text-red-500 font-medium">
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <Button type="submit" className="w-full bg-brand-red hover:bg-red-700 h-11 text-base" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="justify-center pb-8 bg-slate-50/50 border-t border-slate-100 pt-6 mt-2">
                    <p className="text-sm text-slate-500">
                      Remember your password? <Link to="/login" className="text-brand-red hover:underline font-semibold">Log in</Link>
                    </p>
                  </CardFooter>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} 
                    className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50"
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">Check your inbox</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    We have sent a password reset link to <span className="font-semibold text-slate-900">your email</span>. Please check your inbox and spam folder.
                  </p>
                  
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 h-11">
                      <Link to="/login">Return to Login</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => setIsSubmitted(false)} className="w-full text-slate-500 hover:text-slate-900">
                      Click here to resend
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;