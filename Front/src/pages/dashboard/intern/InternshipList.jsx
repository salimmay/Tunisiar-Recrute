import { useQuery } from "@tanstack/react-query";
import { getInternships } from "@/services/internshipService";
import InternshipCard from "@/features/internships/InternshipCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/shared/PageContainer";
import { motion } from "framer-motion"; // Import Motion

// Stagger Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const InternshipList = () => {
  const { data: offers, isLoading, isError } = useQuery({
    queryKey: ['internships'],
    queryFn: getInternships,
  });

  return (
    <PageContainer className="space-y-8">
      {/* ... Header ... */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">
            Available Positions
          </h1>
          <p className="text-slate-500">
            Find your perfect role at Tunisair.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input placeholder="Search offers..." className="pl-10" />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animated Grid */}
      {!isLoading && !isError && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {offers?.map((offer) => (
            <motion.div key={offer._id} variants={item}>
              <InternshipCard offer={offer} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </PageContainer>
  );
};

export default InternshipList;