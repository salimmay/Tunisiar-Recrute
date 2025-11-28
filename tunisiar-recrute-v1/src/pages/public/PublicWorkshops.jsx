import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/shared/PageContainer";
import { Link } from "react-router-dom";

// Mock Data for Public Showcase (Since real workshops are private)
const showcaseEvents = [
  {
    title: "Aviation Safety Standards 2025",
    category: "Technical",
    date: "Oct 24, 2025",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?q=80&w=1000&auto=format&fit=crop",
    type: "On-site"
  },
  {
    title: "Intro to Flight Logistics",
    category: "Operations",
    date: "Nov 02, 2025",
    time: "02:00 PM",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
    type: "Virtual"
  },
  {
    title: "Boeing 737 Engine Diagnostics",
    category: "Engineering",
    date: "Nov 15, 2025",
    time: "09:00 AM",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000&auto=format&fit=crop",
    type: "On-site"
  }
];

const PublicWorkshops = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Knowledge Takes Flight
          </motion.h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Join our expert-led workshops. From technical engineering deep-dives to soft-skills training, we prepare you for the industry.
          </p>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </section>

      {/* Event Cards */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseEvents.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-slate-200 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm hover:bg-white">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-center text-sm text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-brand-red" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {event.time}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 line-clamp-2">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      {event.type === 'Virtual' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      <span>{event.type === 'Virtual' ? 'Online via Google Meet' : 'Tunis-Carthage Training Center'}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-slate-100 pt-4 bg-slate-50/50">
                    <Button asChild variant="ghost" className="w-full hover:text-brand-red hover:bg-red-50 group/btn">
                      <Link to="/login">
                        Register to Attend <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-brand-red rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-red-600/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to learn from the best?</h2>
              <p className="text-red-100 mb-8 max-w-xl mx-auto">
                Access exclusive workshops and training material by creating your candidate profile today.
              </p>
              <Button asChild size="lg" className="bg-white text-brand-red hover:bg-slate-100 rounded-full px-8">
                <Link to="/register">Start Application</Link>
              </Button>
            </div>
            <Users className="absolute top-1/2 left-10 -translate-y-1/2 h-64 w-64 text-white opacity-10" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default PublicWorkshops;