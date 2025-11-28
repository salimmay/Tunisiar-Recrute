import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Illustration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="text-center relative z-10 max-w-lg">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
            <AlertTriangle className="h-12 w-12 text-brand-red" />
          </div>
        </div>
        <h1 className="text-8xl font-display font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Flight Not Found</h2>
        <p className="text-slate-500 mb-8 text-lg">
          It seems you have drifted off course. The page you are looking for has either moved or does not exist on our radar.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-brand-red hover:bg-red-700 rounded-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Return to Base
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;