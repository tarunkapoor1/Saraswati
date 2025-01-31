import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "../components/SearchBox";
import ResponseDisplay from "../components/ResponseDisplay";
import Logo from "../components/Logo";
import { Language } from "../components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [citations, setCitations] = useState<Array<{ url: string; title: string }>>([]);

  const handleSearch = async (query: string, language: Language) => {
    setIsLoading(true);
    setResponse("");
    setCitations([]);

    try {
      // Get the current user's ID (if logged in)
      const { data: { user } } = await supabase.auth.getUser();
      
      let questionId: string | undefined;

      // Only save question to database if user is authenticated
      if (user) {
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .insert({
            question: query,
            source_language: language.code,
            user_id: user.id
          })
          .select()
          .single();

        if (questionError) throw questionError;
        questionId = questionData.id;
      }

      // Process the question using our Edge Function
      const { data, error } = await supabase.functions.invoke('process-question', {
        body: { question: query, language: language.code },
      });

      if (error) throw error;

      // Save the answer to database only if user is authenticated and we have a question ID
      if (user && questionId) {
        const { error: answerError } = await supabase
          .from('answers')
          .insert({
            question_id: questionId,
            answer: data.answer,
            citations: data.citations,
          });

        if (answerError) throw answerError;
      }

      // Update the UI
      setResponse(data.answer);
      setCitations(data.citations);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while processing your request.",
        variant: "destructive",
      });
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b8b8f3]/20 via-[#d7b8f3]/20 to-[#f397d6]/20 px-4 py-12 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Logo />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b8b8f3] via-[#d7b8f3] to-[#f397d6] animate-in">
            Saraswati
          </h1>
          <p className="text-[#232e21] text-lg opacity-80 font-medium">
            Wisdom flows through every answer
          </p>
        </div>
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        <ResponseDisplay
          response={response}
          citations={citations}
          isStreaming={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;