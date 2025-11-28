import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Timer, AlertCircle } from "lucide-react";

import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TakeQuiz = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: "selectedOption" }

  // Fetch Quiz
  const { data: questions, isLoading } = useQuery({
    queryKey: ['quiz', offerId],
    queryFn: async () => {
      const res = await api.get(`/quizQuestions/internship/${offerId}`);
      return res.data;
    }
  });

  // Submit Mutation
  const submitMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        user: user.userId || user._id,
        internshipOffer: offerId,
        answers: questions.map((q) => ({
          questionId: q._id,
          givenAnswer: answers[q._id] || "",
          isCorrect: q.correctOption === answers[q._id]
        }))
      };
      await api.post("/quizResults/quiz-results", payload);
    },
    onSuccess: () => {
      toast.success("Assessment Completed!");
      navigate("/dashboard/applications");
    },
    onError: () => toast.error("Submission failed")
  });

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading Assessment...</div>;
  
  if (!questions || questions.length === 0) return (
    <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
      <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold">No Assessment Found</h2>
      <p className="text-slate-500 mb-6">This offer does not have a quiz attached yet.</p>
      <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [currentQ._id]: option }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      
      {/* Progress Header */}
      <div className="w-full max-w-3xl mb-8 space-y-2">
        <div className="flex justify-between text-sm font-medium text-slate-600">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span className="flex items-center gap-1"><Timer className="h-4 w-4" /> Time: Unlimited</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="w-full max-w-3xl shadow-xl border-0 overflow-hidden">
        <div className="bg-brand-dark p-8 text-white">
          <h2 className="text-2xl font-display font-bold leading-relaxed">
            {currentQ.questionText}
          </h2>
        </div>
        
        <CardContent className="p-8">
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentQ._id] === opt;
                return (
                  <motion.div 
                    key={`${currentQ._id}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center justify-between group ${
                        isSelected 
                          ? "border-brand-red bg-red-50 text-brand-red font-medium" 
                          : "border-slate-100 hover:border-brand-red/30 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full border ${isSelected ? "bg-brand-red text-white border-brand-red" : "border-slate-300 text-slate-400"}`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </span>
                      {isSelected && <CheckCircle2 className="h-5 w-5 animate-in zoom-in" />}
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100">
            <Button 
              variant="ghost" 
              disabled={currentIdx === 0} 
              onClick={() => setCurrentIdx(p => p - 1)}
            >
              Previous
            </Button>

            {isLast ? (
              <Button 
                className="bg-brand-red hover:bg-red-700 px-8" 
                disabled={submitMutation.isPending || !answers[currentQ._id]}
                onClick={() => submitMutation.mutate()}
              >
                {submitMutation.isPending ? "Submitting..." : "Finish Assessment"}
              </Button>
            ) : (
              <Button 
                className="bg-slate-900" 
                disabled={!answers[currentQ._id]}
                onClick={() => setCurrentIdx(p => p + 1)}
              >
                Next Question <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakeQuiz;