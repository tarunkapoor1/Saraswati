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
          className="w-full px-6 py-4 text-lg bg-white/50 backdrop-blur-sm border border-[#9b87f5]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/20 transition-all duration-200 shadow-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-[#9b87f5] text-white opacity-90 hover:opacity-100 transition-opacity disabled:opacity-50 shadow-md"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;