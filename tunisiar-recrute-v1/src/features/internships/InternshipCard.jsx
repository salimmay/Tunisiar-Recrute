import { MapPin, Building2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InternshipDetailsDialog from "./InternshipDetailsDialog";
const InternshipCard = ({ offer }) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all border-slate-200 group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="bg-slate-100 p-2.5 rounded-lg mb-3 group-hover:bg-red-50 transition-colors">
            {/* Fallback icon if no image provided */}
            <Building2 className="h-6 w-6 text-slate-500 group-hover:text-brand-red" />
          </div>
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
            Full-time
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
          {offer.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Building2 className="h-3.5 w-3.5" /> {offer.department}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
          {offer.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {offer.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Posted recently
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <InternshipDetailsDialog offer={offer}>
          <Button className="w-full bg-red-600 hover:bg-brand-red group-hover:shadow-md transition-all">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </InternshipDetailsDialog>
      </CardFooter>
    </Card>
  );
};

export default InternshipCard;