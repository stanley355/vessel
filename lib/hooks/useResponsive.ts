import { useState, useEffect } from "react";

function useResponsive() {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(min-width: 1024px)");
    if (mediaQueryList.matches !== isDesktop) {
      setIsDesktop(mediaQueryList.matches);
    }

    const documentChangeHandler = () => setIsDesktop(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);
    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [isDesktop]);

  return {
    isDesktop: isClient ? isDesktop : true,
  };
}

export default useResponsive;
