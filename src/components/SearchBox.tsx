import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBox = ({ onSearch, isLoading }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
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
  );
};

export default SearchBox;