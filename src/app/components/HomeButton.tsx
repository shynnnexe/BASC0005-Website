import { Home } from "lucide-react";

interface HomeButtonProps {
  onNavigate: (page: number) => void;
}

export function HomeButton({ onNavigate }: HomeButtonProps) {
  return (
    <button
      onClick={() => onNavigate(0)}
      className="fixed top-6 md:top-8 left-6 md:left-12 z-50 px-3 md:px-4 py-2 md:py-3 rounded-full bg-[#4a90e2]/20 backdrop-blur-md border border-[#4a90e2]/40 hover:bg-[#4a90e2]/30 text-white shadow-lg transition-all hover:scale-105 flex items-center gap-2 text-sm"
      aria-label="Return to home"
    >
      <Home className="w-4 h-4" />
      <span className="hidden sm:inline">Home</span>
    </button>
  );
}