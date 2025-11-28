import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Plane, Trophy } from "lucide-react";
import { motion } from "framer-motion";  
import planeImage from "@/assets/plane.png";
import Counter from "@/components/shared/Counter";

  
const Home = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-50 text-brand-red text-sm font-bold mb-6 border border-red-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                  </span>
                  Recruiting for Summer 2025
                </span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl lg:text-7xl font-display font-bold text-brand-dark leading-[1.1] mb-6">
                  Launch Your Career <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-600">
                    Above the Clouds
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                  Join the national carrier. Experience the aviation industry firsthand with internships designed to challenge, inspire, and elevate your professional journey.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-red hover:bg-red-700 text-white rounded-full h-14 px-8 text-lg shadow-xl shadow-red-600/20" asChild>
                  <Link to="/login">Browse Offers</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-slate-300 hover:bg-white hover:text-brand-red group" asChild>
                  <Link to="/about">
                    Learn Process <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right: Floating Plane Visual */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:block relative"
            >
              {/* You can replace this URL with a local asset like /assets/plane.png */}
              <img 
                src={planeImage}
                alt="Tunisair Plane"
                className="w-full max-w-xl mx-auto drop-shadow-2xl object-contain opacity-90"
              />
              {/* Decorative Circle behind plane */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-white rounded-full -z-10 blur-3xl opacity-60" />
            </motion.div>

          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-slate-50 to-slate-100 -z-20" />
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {[
              { label: "Years of Excellence", value: "75+", icon: Trophy },
              { label: "Destinations", value: "100+", icon: Globe },
              { label: "Interns Hired", value: "500+", icon: Users },
              { label: "Aircraft Fleet", value: "32", icon: Plane },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center group cursor-default">
                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                
                {/* The Animated Counter */}
                <h3 className="text-4xl font-display font-bold text-brand-dark mb-1">
                  <Counter value={stat.value} />
                </h3>
                
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;