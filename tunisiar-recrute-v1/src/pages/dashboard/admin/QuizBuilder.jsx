import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Plus, Trash2, Save, CheckCircle2, HelpCircle, Loader2, GripVertical 
} from "lucide-react";

import api from "@/lib/axios";
import PageContainer from "@/components/shared/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// Robust Schema
const questionSchema = z.object({
  questionText: z.string().min(5, "Question must be at least 5 characters"),
  options: z.array(z.string().min(1, "Option cannot be empty")).length(4),
  correctIndex: z.string({ required_error: "Please select the correct answer" }),
});

const QuizBuilder = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Fetch Existing Questions
  const { data: questions, isLoading } = useQuery({
    queryKey: ['quiz', offerId],
    queryFn: async () => {
      const res = await api.get(`/quizQuestions/internship/${offerId}`);
      // Handle varying API responses (array vs object wrapper)
      return Array.isArray(res.data) ? res.data : [];
    }
  });

  // 2. Form Logic
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: "",
      options: ["", "", "", ""],
      correctIndex: undefined // We store index (0-3) here, map to text on submit
    }
  });
  
  const watchedIndex = watch("correctIndex");

  // 3. Add Question Mutation
  const addMutation = useMutation({
    mutationFn: async (data) => {
      // Map the index back to the actual text value for the backend
      const correctOptionText = data.options[parseInt(data.correctIndex)];
      
      const payload = {
        internshipOfferId: offerId,
        questions: [{ 
          questionText: data.questionText,
          options: data.options,
          correctOption: correctOptionText 
        }]
      };
      
      await api.post("/quizQuestions/quiz", payload);
    },
    onSuccess: () => {
      toast.success("Question added to assessment");
      queryClient.invalidateQueries(['quiz', offerId]);
      reset({
        questionText: "",
        options: ["", "", "", ""],
        correctIndex: undefined
      });
    },
    onError: (err) => toast.error("Failed to add question")
  });

  // 4. Delete Mutation (Assuming endpoint exists, otherwise we might need to update the whole array)
  const deleteMutation = useMutation({
    mutationFn: async (questionId) => {
      // If your backend supports deleting specific questions:
       await api.delete(`/quizQuestions/${questionId}`);
    },
    onSuccess: () => {
      toast.success("Question removed");
      queryClient.invalidateQueries(['quiz', offerId]);
    },
    onError: () => toast.error("Could not delete question")
  });

  return (
    <PageContainer className="space-y-8 max-w-6xl mx-auto">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="link" className="mb-1 pl-0 text-slate-500 hover:text-brand-red" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offer Details
          </Button>
          <h1 className="text-3xl font-display font-bold text-slate-900">Quiz Builder</h1>
          <p className="text-slate-500">Construct the technical assessment for this role.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="px-4 text-right border-r border-slate-100">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Questions</p>
            <p className="text-2xl font-bold text-brand-dark">{questions?.length || 0}</p>
          </div>
          <div className="px-4">
             <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Est. Time</p>
             <p className="text-2xl font-bold text-brand-dark">{(questions?.length || 0) * 1.5} <span className="text-xs font-normal text-slate-400">min</span></p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT: Form (Sticky) --- */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <Card className="border-t-4 border-t-brand-red shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Plus className="h-5 w-5 text-brand-red" /> New Question
              </CardTitle>
              <CardDescription>Fill in the details and mark the correct answer.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-6">
              <form onSubmit={handleSubmit((data) => addMutation.mutate(data))} className="space-y-6">
                
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Question Text</Label>
                  <Textarea 
                    placeholder="e.g. Which HTTP status code represents 'Not Found'?" 
                    className="min-h-[80px] text-base resize-none bg-slate-50 focus:bg-white transition-colors"
                    {...register("questionText")} 
                  />
                  {errors.questionText && <span className="text-xs text-red-500 font-medium">{errors.questionText.message}</span>}
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-700 font-semibold flex justify-between">
                    Answer Options
                    <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Select the radio button for correct answer</span>
                  </Label>
                  
                  <RadioGroup onValueChange={(val) => setValue("correctIndex", val)} value={watchedIndex}>
                    {[0, 1, 2, 3].map((index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 group focus-within:border-brand-sky ${
                          watchedIndex === index.toString() 
                            ? "border-green-500 bg-green-50/30" 
                            : "border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`opt-${index}`} 
                          className="data-[state=checked]:border-green-600 data-[state=checked]:text-green-600"
                        />
                        <div className="flex-1">
                          <Input 
                            {...register(`options.${index}`)}
                            placeholder={`Option ${index + 1}`} 
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto py-0 shadow-none font-medium text-slate-700 placeholder:text-slate-400"
                          />
                        </div>
                        {watchedIndex === index.toString() && (
                           <CheckCircle2 className="h-5 w-5 text-green-600 animate-in zoom-in duration-300" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.correctIndex && <span className="text-xs text-red-500 font-medium block mt-1">Please mark which option is correct.</span>}
                  {errors.options && <span className="text-xs text-red-500 font-medium block">All options must be filled out.</span>}
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-base" disabled={addMutation.isPending}>
                    {addMutation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Add Question to Quiz"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* --- RIGHT: List (Scrollable) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-slate-400" /> Current Questions
            </h3>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />)}
            </div>
          ) : questions?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Plus className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-slate-900 font-semibold">Empty Assessment</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-xs">Use the form to add the first question to this internship offer.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {questions.map((q, i) => (
                  <motion.div
                    key={q._id || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    <Card className="group border-l-4 border-l-slate-300 hover:border-l-brand-red transition-all">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 mb-3 text-sm flex items-start gap-2">
                              <span className="bg-slate-100 text-slate-500 px-1.5 rounded text-xs py-0.5 mt-0.5">#{i + 1}</span>
                              {q.questionText}
                            </p>
                            <div className="space-y-1.5">
                              {q.options.map((opt, idx) => (
                                <div key={idx} className={`text-xs px-2 py-1.5 rounded border ${
                                  opt === q.correctOption 
                                    ? "bg-green-50 border-green-200 text-green-800 font-semibold flex items-center justify-between" 
                                    : "bg-white border-transparent text-slate-500"
                                }`}>
                                  {opt}
                                  {opt === q.correctOption && <CheckCircle2 className="h-3 w-3" />}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-300 hover:text-red-600 hover:bg-red-50 -mt-1 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              if(confirm("Delete this question?")) deleteMutation.mutate(q._id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </PageContainer>
  );
};

export default QuizBuilder;