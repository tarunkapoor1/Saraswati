import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const indianLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
];

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector = ({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-lg border border-[#b8b8f3]/30 hover:bg-white/30 transition-colors">
        <Globe className="w-4 h-4 text-[#232e21]" />
        <span className="text-sm text-[#232e21]">{selectedLanguage.nativeName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/90 backdrop-blur-lg border-[#b8b8f3]/30">
        {indianLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language)}
            className="text-[#232e21] hover:bg-[#d7b8f3]/20"
          >
            <span className="mr-2">{language.nativeName}</span>
            <span className="text-[#232e21]/60 text-sm">({language.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
export { indianLanguages };