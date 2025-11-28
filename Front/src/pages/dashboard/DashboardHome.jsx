import { useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, FileText, Users, TrendingUp, Activity, 
  Calendar, Plus, ArrowRight, Clock, CheckCircle2, XCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageContainer from "@/components/shared/PageContainer";
import useAuthStore from "@/store/useAuthStore";

// --- Mock Data (Visuals) ---
const chartData = [
  { name: 'Mon', value: 12 },
  { name: 'Tue', value: 19 },
  { name: 'Wed', value: 15 },
  { name: 'Thu', value: 28 },
  { name: 'Fri', value: 35 },
  { name: 'Sat', value: 10 },
  { name: 'Sun', value: 8 },
];

// --- Components ---

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1, duration: 0.4 }}
  >
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 overflow-hidden group" style={{ borderLeftColor: color }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors`}>
          <Icon className={`h-4 w-4`} style={{ color }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-display font-bold text-slate-900">{value}</div>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          {subtext && <TrendingUp className="h-3 w-3 text-green-500" />}
          {subtext}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const RecentActivityItem = ({ title, desc, time, icon: Icon, color }) => (
  <div className="flex gap-4 items-start">
    <div className={`mt-1 p-2 rounded-full bg-slate-50 border border-slate-100 shrink-0 ${color}`}>
      <Icon className="h-4 w-4" />
    </div>
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
      <p className="text-[10px] text-slate-400 font-mono uppercase">{time}</p>
    </div>
  </div>
);

const DashboardHome = () => {
  const user = useAuthStore((state) => state.user);
  // Normalize role: 'Administrator' -> 'admin', etc.
  const role = user?.role?.toLowerCase().includes('admin') ? 'admin' 
             : user?.role?.toLowerCase() === 'supervisor' ? 'supervisor' 
             : 'intern';

  // --- Dynamic Stats Based on Role ---
  const stats = useMemo(() => {
    if (role === 'admin') return [
      { title: "Total Users", value: "1,240", subtext: "+12% new signups", icon: Users, color: "#38BDF8" },
      { title: "Active Offers", value: "12", subtext: "3 expiring soon", icon: Briefcase, color: "#D6001C" },
      { title: "Pending Review", value: "45", subtext: "Applications", icon: FileText, color: "#F59E0B" },
      { title: "Avg. Score", value: "78%", subtext: "Tech Assessment", icon: Activity, color: "#10B981" },
    ];
    if (role === 'supervisor') return [
      { title: "My Interns", value: "8", subtext: "Active Supervision", icon: Users, color: "#38BDF8" },
      { title: "Workshops", value: "3", subtext: "Upcoming this week", icon: Calendar, color: "#8B5CF6" },
      { title: "Reports Due", value: "2", subtext: "End of month", icon: FileText, color: "#D6001C" },
      { title: "Attendance", value: "98%", subtext: "Team average", icon: Activity, color: "#10B981" },
    ];
    // Intern / Default
    return [
      { title: "Applications", value: "3", subtext: "1 in review", icon: FileText, color: "#38BDF8" },
      { title: "Interviews", value: "0", subtext: "Scheduled", icon: Users, color: "#F59E0B" },
      { title: "Workshops", value: "2", subtext: "Registered", icon: Calendar, color: "#8B5CF6" },
      { title: "Profile Strength", value: "85%", subtext: "Complete your bio", icon: Activity, color: "#10B981" },
    ];
  }, [role]);

  return (
    <PageContainer className="space-y-8">
      
      {/* --- Welcome Banner --- */}
      <div className="relative bg-gradient-to-br from-slate-900 to-brand-dark rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl shadow-slate-200">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4 text-slate-300 text-sm font-medium uppercase tracking-widest">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 bg-brand-red rounded-full" />
            <span>Tunis, Tunisia</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">
            Good Morning, {user?.firstname || "Candidate"}!
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {role === 'admin' 
              ? "System activity is normal. You have 5 new applications pending review."
              : role === 'supervisor'
              ? "You have a workshop scheduled for tomorrow at 10:00 AM."
              : "Your application for 'Software Engineer Intern' moved to the next stage."
            }
          </p>
          
          {/* Quick Actions */}
          <div className="mt-8 flex gap-4">
            {role === 'admin' && (
              <Button className="bg-white text-brand-dark hover:bg-slate-100 rounded-full px-6 font-bold" asChild>
                <Link to="/dashboard/admin/offers"><Plus className="mr-2 h-4 w-4" /> Create Offer</Link>
              </Button>
            )}
            {role === 'intern' && (
              <Button className="bg-brand-red text-white hover:bg-red-700 rounded-full px-6 font-bold" asChild>
                <Link to="/dashboard/internships">Browse Offers</Link>
              </Button>
            )}
             <Button variant="outline" className="bg-transparent border-slate-700 text-white hover:bg-white/10 hover:text-white rounded-full px-6" asChild>
                <Link to="/dashboard/profile">View Profile</Link>
              </Button>
          </div>
        </div>

        {/* Decorative Abstract Shapes */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-brand-red/20 to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i} />
        ))}
      </div>

      {/* --- Main Content Area --- */}
      <div className="grid gap-8 md:grid-cols-7">
        
        {/* LEFT: Analytics Chart */}
        <Card className="md:col-span-4 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Overview of activity over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D6001C" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#D6001C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#D6001C', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#D6001C" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT: Recent Activity Timeline */}
        <Card className="md:col-span-3 shadow-sm border-slate-200 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:-translate-x-px before:bg-slate-100 before:content-['']">
              
              {/* Mock Timeline Data */}
              {role === 'admin' ? (
                <>
                  <RecentActivityItem 
                    title="New Application Received" 
                    desc="Ahmed S. applied for Flight Ops Intern" 
                    time="10 mins ago" 
                    icon={FileText} color="text-blue-600" 
                  />
                  <RecentActivityItem 
                    title="Workshop Scheduled" 
                    desc="Safety Training set for Oct 24" 
                    time="2 hours ago" 
                    icon={Calendar} color="text-purple-600" 
                  />
                   <RecentActivityItem 
                    title="New User Registered" 
                    desc="Fatma B. joined as Supervisor" 
                    time="1 day ago" 
                    icon={Users} color="text-green-600" 
                  />
                </>
              ) : (
                <>
                   <RecentActivityItem 
                    title="Application Status Update" 
                    desc="Your application is being reviewed." 
                    time="2 hours ago" 
                    icon={Clock} color="text-yellow-600" 
                  />
                   <RecentActivityItem 
                    title="New Internship Posted" 
                    desc="IT Security Intern position is now open." 
                    time="5 hours ago" 
                    icon={Briefcase} color="text-brand-red" 
                  />
                   <RecentActivityItem 
                    title="Profile Completed" 
                    desc="You successfully updated your CV." 
                    time="1 day ago" 
                    icon={CheckCircle2} color="text-green-600" 
                  />
                </>
              )}
              
            </div>
          </CardContent>
          
          <div className="p-6 pt-0 mt-auto">
             <Button variant="outline" className="w-full text-xs h-8 border-dashed text-slate-500">
               View All Activity
             </Button>
          </div>
        </Card>

      </div>
    </PageContainer>
  );
};

export default DashboardHome;