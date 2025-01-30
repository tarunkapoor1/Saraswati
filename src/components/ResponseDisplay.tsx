import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

interface Citation {
  url: string;
  title: string;
}

interface ResponseDisplayProps {
  response: string;
  citations: Citation[];
  isStreaming: boolean;
}

const ResponseDisplay = ({ response, citations, isStreaming }: ResponseDisplayProps) => {
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  if (!response && !isStreaming) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-in">
      <div className="bg-white/70 backdrop-blur-lg border border-[#9b87f5]/10 rounded-2xl p-6 shadow-lg">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-[#1A1F2C]">{response}</div>
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-[#9b87f5] animate-pulse" />
          )}
        </div>
        {citations.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[#9b87f5]/10">
            <h3 className="text-sm font-medium text-[#8E9196] mb-2">Sources</h3>
            <div className="space-y-2">
              {citations.map((citation, index) => (
                <a
                  key={index}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {citation.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;