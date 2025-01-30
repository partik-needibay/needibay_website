import { useCallback, useEffect, useState } from "react";

const useScrollStatic = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isScrolled;
};

export default useScrollStatic;