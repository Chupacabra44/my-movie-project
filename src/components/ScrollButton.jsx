import { useState, useEffect } from "react";

const ScrollButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed font-bold cursor-pointer bottom-20 right-5 z-50 p-3 rounded-full bg-fuchsia-800 text-white shadow-lg hover:bg-fuchsia-900"
    >
      ↑ Top
    </button>
  );
};

export default ScrollButton;
