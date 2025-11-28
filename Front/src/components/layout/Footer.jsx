import { Link } from "react-router-dom";
import { Plane, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-red p-1.5 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                TUNISAIR <span className="text-brand-red">RECRUTE</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building the future of aviation in Tunisia. Join our internship program and gain world-class experience.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-all">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-100">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link to="/internships" className="hover:text-brand-red transition-colors">Internships</Link></li>
              <li><Link to="/login" className="hover:text-brand-red transition-colors">Candidate Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-100">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-red shrink-0" />
                <span>Tunis-Carthage International Airport,<br />Tunis, Tunisia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-red shrink-0" />
                <span>+216 70 837 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-red shrink-0" />
                <span>recruitment@tunisair.com.tn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-slate-100">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe to get the latest internship offers directly to your inbox.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-brand-red" 
              />
              <Button className="bg-brand-red hover:bg-red-700">
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Tunisair. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;