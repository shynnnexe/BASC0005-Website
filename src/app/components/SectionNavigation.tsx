import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface SectionNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}

export function SectionNavigation({
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
  previousLabel = "Previous Section",
  nextLabel = "Next Section"
}: SectionNavigationProps) {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center justify-between mt-16 pt-12 border-t-2 border-[#4a90e2]/30">
      <Button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`group flex items-center gap-3 px-8 py-4 rounded-full transition-all text-base font-semibold ${
          hasPrevious
            ? isDark
              ? 'bg-gradient-to-r from-[#1a2332]/90 to-[#2c3e50]/90 hover:from-[#4a90e2] hover:to-[#5ca4d8] text-white border-2 border-[#4a90e2]/40 shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gradient-to-r from-white to-[#f0f4f8] hover:from-[#4a90e2] hover:to-[#5ca4d8] text-[#1a2332] hover:text-white border-2 border-[#4a90e2]/30 shadow-lg hover:shadow-xl hover:scale-105'
            : 'opacity-30 cursor-not-allowed bg-transparent border-2 border-[#4a90e2]/10'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>{previousLabel}</span>
      </Button>

      <Button
        onClick={onNext}
        disabled={!hasNext}
        className={`group flex items-center gap-3 px-8 py-4 rounded-full transition-all text-base font-semibold ${
          hasNext
            ? isDark
              ? 'bg-gradient-to-r from-[#1a2332]/90 to-[#2c3e50]/90 hover:from-[#4a90e2] hover:to-[#5ca4d8] text-white border-2 border-[#4a90e2]/40 shadow-lg hover:shadow-xl hover:scale-105'
              : 'bg-gradient-to-r from-white to-[#f0f4f8] hover:from-[#4a90e2] hover:to-[#5ca4d8] text-[#1a2332] hover:text-white border-2 border-[#4a90e2]/30 shadow-lg hover:shadow-xl hover:scale-105'
            : 'opacity-30 cursor-not-allowed bg-transparent border-2 border-[#4a90e2]/10'
        }`}
      >
        <span>{nextLabel}</span>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
