import { useState } from "react";
import { Search } from "lucide-react";
import LanguageSelector, { Language, indianLanguages } from "./LanguageSelector";

interface SearchBoxProps {
  onSearch: (query: string, language: Language) => void;
  isLoading: boolean;
}

const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(indianLanguages[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim(), selectedLanguage);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="flex justify-end">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selectedLanguage.code === "en" ? "Ask anything..." : "अपना प्रश्न पूछें..."}
            className="w-full px-6 py-4 text-lg bg-white/30 backdrop-blur-lg border border-[#b8b8f3]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#d7b8f3]/50 transition-all duration-200 shadow-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-gradient-to-r from-[#d7b8f3] to-[#f397d6] text-white opacity-90 hover:opacity-100 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;