import { useState } from "react";
import SearchBox from "../components/SearchBox";
import ResponseDisplay from "../components/ResponseDisplay";

const Index = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [citations, setCitations] = useState<Array<{ url: string; title: string }>>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResponse("");
    setCitations([]);

    try {
      // Simulate API call for now
      const mockResponse = "This is a simulated response using the Deepseek R1 Free model. The actual integration will be implemented once we have the API endpoint ready.";
      const mockCitations = [
        {
          url: "https://example.com/1",
          title: "Sample Citation 1",
        },
        {
          url: "https://example.com/2",
          title: "Sample Citation 2",
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
    <div className="min-h-screen bg-gradient-to-b from-[#F1F0FB] to-white px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] animate-in">
            Saraswati
          </h1>
          <p className="text-[#1A1F2C] text-lg opacity-80">
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