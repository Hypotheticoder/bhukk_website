import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DeliveryPartner from "./pages/DeliveryPartner";
import AddStore from "./pages/AddStore";
import Partnership from "./pages/Partnership";
import Contact from "./pages/Contact";
import Trust from "./pages/Trust";
import ComingSoon from "./components/ComingSoon";

export type PageType =
  | "home"
  | "partner"
  | "store"
  | "partnership"
  | "contact"
  | "trust";

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Listen for cross-component navigation events (hash or custom)
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (typeof detail === "string") {
        if (
          [
            "home",
            "partner",
            "store",
            "partnership",
            "contact",
            "trust",
          ].includes(detail)
        ) {
          setCurrentPage(detail as PageType);
        }
      }
    };

    const handleHash = () => {
      const h = window.location.hash.replace("#", "");
      if (
        [
          "home",
          "partner",
          "store",
          "partnership",
          "contact",
          "trust",
        ].includes(h)
      ) {
        setCurrentPage(h as PageType);
      }
    };

    window.addEventListener("navigate", handleNavigate as EventListener);
    window.addEventListener("hashchange", handleHash);

    // handle initial hash
    handleHash();

    return () => {
      window.removeEventListener("navigate", handleNavigate as EventListener);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    const handleShowComingSoon = () => setShowComingSoon(true);
    window.addEventListener(
      "show-coming-soon",
      handleShowComingSoon as EventListener,
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "show-coming-soon",
        handleShowComingSoon as EventListener,
      );
    };
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "partner":
        return <DeliveryPartner onGoHome={() => setCurrentPage("home")} />;
      case "store":
        return <AddStore />;
      case "partnership":
        return <Partnership />;
      case "contact":
        return <Contact />;
      case "trust":
        return <Trust />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] overflow-x-hidden">
      <Navbar
        scrolled={scrolled}
        setPage={setCurrentPage}
        currentPage={currentPage}
      />

      {renderPage()}

      <Footer />
      <ComingSoon
        show={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />
    </div>
  );
};

export default App;
