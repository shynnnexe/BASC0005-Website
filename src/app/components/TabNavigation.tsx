import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface TabNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  customPreviousAction?: () => void;
  customPreviousLabel?: string;
  customNextAction?: () => void;
  customNextLabel?: string;
}

export function TabNavigation({
  onPrevious,
  onNext,
  hasPrevious = true,
  hasNext = true,
  previousLabel = "Previous",
  nextLabel = "Next",
  customPreviousAction,
  customPreviousLabel,
  customNextAction,
  customNextLabel
}: TabNavigationProps) {
  const { isDark } = useTheme();

  // Use custom previous action/label if provided, otherwise use defaults
  const effectivePreviousAction = customPreviousAction || onPrevious;
  const effectivePreviousLabel = customPreviousLabel || previousLabel;
  const effectiveHasPrevious = customPreviousAction ? true : hasPrevious;

  // Use custom next action/label if provided, otherwise use defaults
  const effectiveNextAction = customNextAction || onNext;
  const effectiveNextLabel = customNextLabel || nextLabel;
  const effectiveHasNext = customNextAction ? true : hasNext;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#4a90e2]/20">
      <Button
        onClick={effectivePreviousAction}
        disabled={!effectiveHasPrevious}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
          effectiveHasPrevious
            ? isDark
              ? 'bg-[#1a2332]/80 hover:bg-[#4a90e2] text-white border border-[#4a90e2]/30'
              : 'bg-white/90 hover:bg-[#4a90e2] text-[#1a2332] hover:text-white border border-[#4a90e2]/20'
            : 'opacity-50 cursor-not-allowed bg-transparent border border-[#4a90e2]/10'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">{effectivePreviousLabel}</span>
      </Button>

      {/* Back to Top button - centered on mobile */}
      <Button
        onClick={scrollToTop}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#4a90e2] to-[#5ca4d8] hover:from-[#5ca4d8] hover:to-[#4a90e2] text-white border border-[#4a90e2]/30'
            : 'bg-gradient-to-br from-[#4a90e2] to-[#5ca4d8] hover:from-[#5ca4d8] hover:to-[#4a90e2] text-white border border-white/30'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
        <span className="text-sm font-medium hidden md:inline">Back to Top</span>
      </Button>

      <Button
        onClick={effectiveNextAction}
        disabled={!effectiveHasNext}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
          effectiveHasNext
            ? isDark
              ? 'bg-[#1a2332]/80 hover:bg-[#4a90e2] text-white border border-[#4a90e2]/30'
              : 'bg-white/90 hover:bg-[#4a90e2] text-[#1a2332] hover:text-white border border-[#4a90e2]/20'
            : 'opacity-50 cursor-not-allowed bg-transparent border border-[#4a90e2]/10'
        }`}
      >
        <span className="text-sm font-medium">{effectiveNextLabel}</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}