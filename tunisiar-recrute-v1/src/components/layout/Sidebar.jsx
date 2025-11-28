import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  UserCircle, 
  LogOut, 
  X,
  Users,
  Settings,
  Calendar,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // 1. Normalize backend roles
  const userRole = user?.role?.toLowerCase() || "intern";
  const isAdmin = ["administrator", "internship coordinator"].includes(userRole);
  const isSupervisor = userRole === "supervisor";

  // 2. Define Menus
  const internItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Briefcase, label: "Browse Offers", path: "/dashboard/internships" },
    { icon: FileText, label: "My Applications", path: "/dashboard/applications" },
    { icon: UserCircle, label: "Profile", path: "/dashboard/profile" },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Users, label: "Manage Users", path: "/dashboard/admin/users" },
    { icon: Briefcase, label: "Manage Offers", path: "/dashboard/admin/offers" }, // Renamed as requested
    { icon: FileText, label: "Applications", path: "/dashboard/admin/applications" },
  ];

  const supervisorItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Users, label: "My Interns", path: "/dashboard/supervisor/interns" },
    { icon: Calendar, label: "Workshops", path: "/dashboard/supervisor/workshops" },
  ];

  // 3. Select Menu
  let menuItems = internItems;
  if (isAdmin) menuItems = adminItems;
  if (isSupervisor) menuItems = supervisorItems;

  // 4. Logout Handler
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Animation Variants
  const sidebarVariants = {
    mobileClosed: { x: "-100%" },
    mobileOpen: { 
      x: 0, 
      transition: { type: "spring", stiffness: 300, damping: 30 } 
    },
    desktop: { x: 0 } // Always visible on desktop
  };

  return (
    <>
      {/* Mobile Overlay (AnimatePresence handles exit animations) */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        variants={sidebarVariants}
        initial="mobileClosed"
        animate={open ? "mobileOpen" : (window.innerWidth >= 1024 ? "desktop" : "mobileClosed")}
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col shadow-xl lg:shadow-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 h-16">
          <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            StajNet <span className="text-brand-red">
              {isAdmin ? 'ADMIN' : isSupervisor ? 'STAFF' : 'PORTAL'}
            </span>
          </span>
          <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile Snippet */}
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=random`} />
              <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">
                {user?.firstname?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">
                {user?.firstname} {user?.lastname}
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3 text-brand-red" />
                {userRole}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="block relative group">
                {/* Active Background Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarItem"
                    className="absolute inset-0 bg-red-50 rounded-lg border-l-4 border-brand-red"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 relative z-10 h-11 transition-all duration-200",
                    isActive 
                      ? "text-brand-red font-semibold hover:bg-transparent hover:text-brand-red" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-brand-red" : "text-slate-400 group-hover:text-slate-600")} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50 h-11 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
