import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function BackToTop() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let scrollContainer: HTMLElement | null = null;
    
    const findAndAttachScroll = () => {
      // Find the scrollable container
      const findScrollContainer = () => {
        // Look for elements with overflow-auto
        const containers = document.querySelectorAll('.overflow-auto');
        
        for (let i = 0; i < containers.length; i++) {
          const el = containers[i] as HTMLElement;
          // Check if it's actually scrollable (has content that overflows)
          if (el.scrollHeight > el.clientHeight) {
            return el;
          }
        }
        return null;
      };

      scrollContainer = findScrollContainer();
      
      if (scrollContainer) {
        console.log('Found scroll container:', scrollContainer);
        const handleScroll = () => {
          if (scrollContainer && scrollContainer.scrollTop > 300) {
            console.log('Showing button, scrollTop:', scrollContainer.scrollTop);
            setIsVisible(true);
          } else {
            console.log('Hiding button, scrollTop:', scrollContainer?.scrollTop);
            setIsVisible(false);
          }
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        
        // Check initial scroll position
        handleScroll();
        
        return () => {
          if (scrollContainer) {
            scrollContainer.removeEventListener("scroll", handleScroll);
          }
        };
      }
    };

    // Try to attach immediately
    const cleanup = findAndAttachScroll();
    
    // Also try after a short delay to handle late-rendering content
    const timer = setTimeout(() => {
      if (!scrollContainer) {
        findAndAttachScroll();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []); // Empty dependency array - will re-run when component remounts (page change)

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-auto') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-[999] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${ 
            isDark 
              ? 'bg-gradient-to-br from-[#4a90e2] to-[#5ca4d8] hover:from-[#5ca4d8] hover:to-[#4a90e2] text-white' 
              : 'bg-gradient-to-br from-[#4a90e2] to-[#5ca4d8] hover:from-[#5ca4d8] hover:to-[#4a90e2] text-white'
          } backdrop-blur-md border ${
            isDark ? 'border-[#4a90e2]/40' : 'border-white/30'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}