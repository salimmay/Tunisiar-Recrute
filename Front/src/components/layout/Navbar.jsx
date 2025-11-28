import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Plane, User, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/useAuthStore";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  // Optimized Scroll Handler
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 20;
    if (scrolled !== isScrolled) setIsScrolled(scrolled);
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Internships", path: "/internships" },
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-slate-200/50 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2 group relative z-20">
          <div className="bg-brand-red p-1.5 rounded-xl text-white shadow-lg shadow-brand-red/20 transition-transform group-hover:scale-105 duration-300">
            <Plane className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <span className={`font-display font-bold text-xl tracking-tight transition-colors ${
             isScrolled ? "text-slate-900" : "text-slate-900" 
          }`}>
            TUNISAIR <span className="text-brand-red">RECRUTE</span>
          </span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-transparent">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors hover:text-brand-red"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-brand-red font-semibold" : "text-slate-600"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* --- Actions --- */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full focus:outline-none ring-2 ring-transparent hover:ring-brand-red/20 transition-all"
                >
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=random`} />
                    <AvatarFallback className="bg-brand-dark text-white font-bold">
                      {user?.firstname?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 bg-white" align="end" sideOffset={8}>
    
    
<DropdownMenuLabel className="font-normal p-3 bg-white rounded-t-md border-b border-slate-100">
  <div className="flex flex-col space-y-1">
    {/* 1. Force Dark Color (text-slate-900) */}
    {/* 2. Check both 'firstname' (backend) and 'firstName' (frontend convention) */}
    <p className="text-sm font-bold leading-none text-slate-900">
      {user?.firstname || user?.firstName || "Candidate"} {user?.lastname || user?.lastName || ""}
    </p>
    
    {/* Email in gray */}
    <p className="text-xs leading-none text-slate-500 font-medium truncate">
      {user?.email}
    </p>
  </div>
</DropdownMenuLabel>

  

  
                <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5 focus:bg-slate-100">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md p-2.5 focus:bg-slate-100">
                  <Link to="/dashboard/profile">
                    <User className="mr-2 h-4 w-4 text-slate-500" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer rounded-md p-2.5 focus:bg-red-50 focus:text-red-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button variant="ghost" asChild className="text-slate-600 hover:text-brand-red hover:bg-red-50 font-medium">
                <Link to="/login">Sign In</Link>
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-brand-red hover:bg-red-700 text-white rounded-full px-6 shadow-lg shadow-red-600/20 font-semibold" asChild>
                  <Link to="/register">Apply Now</Link>
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-900">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b border-slate-100 pb-4 mb-4">
                <SheetTitle className="font-display font-bold text-xl">
                  TUNISAIR <span className="text-brand-red">MENU</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-red-50 text-brand-red"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && <ChevronRight className="h-4 w-4" />}
                  </Link>
                ))}
                
                <div className="my-4 border-t border-slate-100" />
                
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-slate-900 text-white" asChild>
                      <Link to="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button className="w-full bg-brand-red hover:bg-red-700 h-11" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button variant="outline" className="w-full h-11" asChild>
                      <Link to="/register">Create Account</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;