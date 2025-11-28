import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Globe, TrendingUp, Award, Plane } from "lucide-react";
import PageContainer from "@/components/shared/PageContainer";

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <PageContainer>
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            The Gazelle of the Air
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Since 1948, Tunisair has been the flag carrier of Tunisia, connecting cultures and fostering the next generation of aviation professionals.
          </motion.p>
        </div>
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      </div>

      {/* Values Section (Bento Grid) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">Why Join Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Large Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="h-12 w-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors">
                <Globe className="h-6 w-6 text-brand-red group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Global Exposure</h3>
              <p className="text-slate-500 leading-relaxed">
                Working at Tunisair means engaging with international standards. We operate flights to over 40 destinations across Europe, Africa, and the Middle East, giving our interns exposure to global aviation logistics.
              </p>
            </motion.div>

            {/* Tall Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="md:row-span-2 bg-brand-dark p-8 rounded-3xl shadow-sm flex flex-col justify-between text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Excellence</h3>
                <p className="text-slate-300 leading-relaxed">
                  We strive for perfection in safety, service, and engineering. Our internship program selects the brightest minds to solve real-world challenges.
                </p>
              </div>
              <Plane className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 group-hover:rotate-12 transition-transform duration-700" />
            </motion.div>

            {/* Medium Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Users className="h-6 w-6 text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mentorship</h3>
              <p className="text-slate-500 text-sm">
                Learn directly from captains, senior engineers, and logistics experts who have decades of experience.
              </p>
            </motion.div>

            {/* Medium Card */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="h-12 w-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                <TrendingUp className="h-6 w-6 text-green-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Career Growth</h3>
              <p className="text-slate-500 text-sm">
                Over 70% of our current junior staff started their journey as interns within our technical departments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default About;