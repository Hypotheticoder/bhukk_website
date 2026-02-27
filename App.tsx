import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DeliveryPartner from "./pages/DeliveryPartner";
import AddStore from "./pages/AddStore";
import Partnership from "./pages/Partnership";
import Contact from "./pages/Contact";
import Trust from "./pages/Trust";
import About from "./pages/About";
import DistributorFormPage from "./pages/DistributorFormPage";
import ManufacturerFormPage from "./pages/ManufacturerFormPage";
import RetailerFormPage from "./pages/RetailerFormPage";
import DeliveryPartnerFormPage from "./pages/DeliveryPartnerFormPage";
import ComingSoon from "./components/ComingSoon";

export type PageType =
  | "home"
  | "partner"
  | "store"
  | "partnership"
  | "contact"
  | "trust"
  | "about"
  | "distributor-form"
  | "manufacturer-form"
  | "retailer-form"
  | "delivery-partner-form";

const VALID_PAGES: PageType[] = [
  "home",
  "partner",
  "store",
  "partnership",
  "contact",
  "trust",
  "about",
  "distributor-form",
  "manufacturer-form",
  "retailer-form",
  "delivery-partner-form",
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [scrolled, setScrolled] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  /* -------------------------------
     NAVIGATION (SINGLE SOURCE)
     ------------------------------- */

  const navigate = (page: PageType) => {
    if (window.location.hash.replace("#", "") !== page) {
      window.location.hash = page;
    }
  };

  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.replace("#", "") || "home";

      if (VALID_PAGES.includes(hash as PageType)) {
        setCurrentPage(hash as PageType);
      } else {
        setCurrentPage("home");
        window.location.hash = "home";
      }
    };

    // Initial load
    syncWithHash();

    // Back / Forward buttons
    window.addEventListener("hashchange", syncWithHash);

    return () => {
      window.removeEventListener("hashchange", syncWithHash);
    };
  }, []);

  /* -------------------------------
     SCROLL HANDLING
     ------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  /* -------------------------------
     GLOBAL UI EVENTS
     ------------------------------- */

  useEffect(() => {
    const showComingSoonHandler = () => setShowComingSoon(true);

    window.addEventListener(
      "show-coming-soon",
      showComingSoonHandler as EventListener,
    );

    return () => {
      window.removeEventListener(
        "show-coming-soon",
        showComingSoonHandler as EventListener,
      );
    };
  }, []);

  /* -------------------------------
     PAGE RENDERER
     ------------------------------- */

  const renderPage = () => {
    switch (currentPage) {
      case "partner":
        return <DeliveryPartner onGoHome={() => navigate("home")} />;
      case "store":
        return <AddStore />;
      case "partnership":
        return <Partnership />;
      case "contact":
        return <Contact />;
      case "trust":
        return <Trust />;
      case "about":
        return <About />;
      case "distributor-form":
        return <DistributorFormPage />;
      case "manufacturer-form":
        return <ManufacturerFormPage />;
      case "retailer-form":
        return <RetailerFormPage />;
      case "delivery-partner-form":
        return <DeliveryPartnerFormPage />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] overflow-x-hidden">
      <Navbar
        scrolled={scrolled}
        currentPage={currentPage}
        navigate={navigate} // ✅ ONLY way to navigate
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
