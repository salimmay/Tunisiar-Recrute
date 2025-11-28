import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  MoreVertical, 
  Trash2, 
  Users, 
  Search,
  LayoutGrid,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/axios";
import PageContainer from "@/components/shared/PageContainer";
import CreateWorkshopDialog from "@/features/workshops/CreateWorkshopDialog";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Ensure you have this or use buttons

// --- API ---
const getWorkshops = async () => {
  const response = await api.get("/workshops");
  return response.data.data || response.data;
};

const Workshops = () => {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'calendar'
  const [searchTerm, setSearchTerm] = useState("");
  const [workshopToDelete, setWorkshopToDelete] = useState(null);
  
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: workshops, isLoading } = useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshops,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await api.delete(`/workshops/${id}`),
    onSuccess: () => {
      toast.success("Workshop removed");
      queryClient.invalidateQueries(['workshops']);
      setWorkshopToDelete(null);
    },
    onError: () => toast.error("Failed to delete"),
  });

  // Filter Logic
  const filteredWorkshops = workshops?.filter(ws => 
    ws.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Calendar Helpers ---
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
    
    // Adjust for Monday start (Optional, keeping Sun start for standard view)
    const paddingDays = firstDayOfWeek; 
    
    const days = [];
    for (let i = 0; i < paddingDays; i++) days.push(null); // Padding
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  // Helper to format date components
  const getDateInfo = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      fullDate: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  return (
    <PageContainer className="space-y-8">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Workshops & Events</h1>
          <p className="text-slate-500">Manage training sessions, webinars, and team meetings.</p>
        </div>
        <div className="flex gap-3">
           {/* Toggle View Buttons */}
           <div className="bg-white border border-slate-200 rounded-lg p-1 flex items-center">
              <button 
                onClick={() => setViewMode("cards")}
                className={`p-2 rounded-md transition-all ${viewMode === "cards" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode("calendar")}
                className={`p-2 rounded-md transition-all ${viewMode === "calendar" ? "bg-slate-100 text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                <CalendarIcon className="h-4 w-4" />
              </button>
           </div>
           <CreateWorkshopDialog />
        </div>
      </div>

      {/* --- Toolbar (Search only for Cards) --- */}
      {viewMode === "cards" && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search workshops..." 
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* === VIEW: CALENDAR === */}
      {viewMode === "calendar" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => changeMonth(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={() => changeMonth(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 auto-rows-[140px] divide-x divide-slate-100 border-b border-slate-100">
            {getDaysInMonth(currentDate).map((date, i) => {
               // Find events for this day
               const dayEvents = date ? workshops?.filter(ws => isSameDay(new Date(ws.date), date)) : [];
               const isToday = date && isSameDay(date, new Date());

               return (
                <div key={i} className={`relative p-2 group ${date ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/30"}`}>
                  {date && (
                    <>
                      <span className={`text-sm font-medium block mb-2 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-brand-red text-white" : "text-slate-700"}`}>
                        {date.getDate()}
                      </span>
                      
                      <div className="space-y-1 overflow-y-auto max-h-[90px] custom-scrollbar">
                        {dayEvents?.map(ev => (
                          <div key={ev._id} className="text-xs p-1.5 rounded bg-blue-50 border border-blue-100 text-blue-700 font-medium truncate hover:bg-blue-100 cursor-pointer transition-colors">
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
               );
            })}
          </div>
        </motion.div>
      )}

      {/* === VIEW: CARDS === */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {isLoading && [1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-slate-200">
              <div className="h-2 bg-slate-100" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </CardContent>
            </Card>
          ))}

          <AnimatePresence>
            {filteredWorkshops?.map((ws, index) => {
              const { day, month, time, fullDate } = getDateInfo(ws.date);
              const isUpcoming = new Date(ws.date) > new Date();

              return (
                <motion.div
                  key={ws._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`group h-full flex flex-col border-slate-200 hover:border-brand-red/30 hover:shadow-lg transition-all duration-300 overflow-hidden ${!isUpcoming ? 'opacity-80 bg-slate-50' : 'bg-white'}`}>
                    <div className={`h-1.5 w-full ${isUpcoming ? 'bg-brand-red' : 'bg-slate-300'}`} />
                    
                    <CardHeader className="p-6 pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-start gap-4">
                        <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border text-center shrink-0 ${isUpcoming ? 'bg-red-50 border-red-100 text-brand-red' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
                          <span className="text-2xl font-display font-bold leading-none">{day}</span>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-brand-red transition-colors">{ws.title}</h3>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge variant="secondary" className="font-normal text-xs px-2 py-0 h-5 bg-slate-100 text-slate-600">
                               {ws.meetLink ? "Virtual" : "In-Person"}
                            </Badge>
                            {!isUpcoming && <span className="text-xs text-slate-400 font-medium">Past Event</span>}
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 -mr-2 text-slate-400 hover:text-slate-700">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                            onClick={() => setWorkshopToDelete(ws._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>

                    <CardContent className="p-6 pt-4 flex-1">
                      <p className="text-sm text-slate-500 line-clamp-2 mb-6 h-10 leading-relaxed">
                        {ws.description}
                      </p>

                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>{time}, {fullDate}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="truncate">{ws.meetLink ? "Online (Google Meet)" : "Tunis-Carthage HQ"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-700">
                          <Users className="h-4 w-4 text-slate-400" />
                          <span>{ws.attendees?.length || 0} Attendees invited</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 bg-slate-50 border-t border-slate-100">
                      {ws.meetLink ? (
                        <Button className="w-full bg-white border border-slate-200 text-slate-700 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow-sm" asChild>
                          <a href={ws.meetLink} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" /> Join Meeting
                          </a>
                        </Button>
                      ) : (
                        <Button disabled variant="outline" className="w-full bg-slate-100 text-slate-400 border-slate-200">
                          No Link Provided
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* --- Delete Confirmation --- */}
      <AlertDialog open={!!workshopToDelete} onOpenChange={() => setWorkshopToDelete(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Workshop?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the event from all interns' calendars.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => deleteMutation.mutate(workshopToDelete)}
            >
              Yes, Delete it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </PageContainer>
  );
};

export default Workshops;