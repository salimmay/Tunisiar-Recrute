import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import ApplicationForm from "@/features/applications/ApplicationForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuthStore from "@/store/useAuthStore"; 

const InternshipDetailsDialog = ({ offer, children }) => {
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
 // Hooks
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      // If not logged in, redirect to login
      navigate("/login");
    } else {
      // If logged in, show form
      setShowForm(true);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 bg-gray-100 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-white text-brand-dark border-slate-200">
              {offer.department}
            </Badge>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
              Open
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-display font-bold text-slate-900">
            {offer.title}
          </DialogTitle>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Building2 className="h-4 w-4"/> Tunisair</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> {offer.location}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 p-6  bg-white">
          {!showForm ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Job Description</h4>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {offer.description}
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-1">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>Currently enrolled in a university program</li>
                  <li>Available for a 3-6 month period</li>
                  <li>Strong communication skills</li>
                </ul>
              </div>
            </div>
          ) : (
            <ApplicationForm offerId={offer._id} onSuccess={() => setOpen(false)} />
          )}
        </ScrollArea>

        {/* Footer Actions */}
        {!showForm && (
          <div className="p-6 border-t border-slate-100 bg-white">
            <Button 
              className="w-full bg-brand-red hover:bg-red-700 text-lg h-12"
              onClick={handleApplyClick}
            >
              Apply for this Position <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InternshipDetailsDialog;