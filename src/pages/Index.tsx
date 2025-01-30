import { useState } from "react";
import SearchBox from "../components/SearchBox";
import ResponseDisplay from "../components/ResponseDisplay";
import Logo from "../components/Logo";
import { Language } from "../components/LanguageSelector";

const Index = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [citations, setCitations] = useState<Array<{ url: string; title: string }>>([]);

  const handleSearch = async (query: string, language: Language) => {
    setIsLoading(true);
    setResponse("");
    setCitations([]);

    try {
      // Simulate API call with language support
      const mockResponse = `This is a simulated response in ${language.name} (${language.nativeName}). The actual integration will be implemented once we have the API endpoint ready.`;
      const mockCitations = [
        {
          url: "https://example.com/1",
          title: `Sample Citation 1 - ${language.name}`,
        },
        {
          url: "https://example.com/2",
          title: `Sample Citation 2 - ${language.name}`,
        },
      ];

      // Simulate streaming
      let currentResponse = "";
      for (const char of mockResponse) {
        currentResponse += char;
        setResponse(currentResponse);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }

      setCitations(mockCitations);
    } catch (error) {
      console.error("Search error:", error);
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