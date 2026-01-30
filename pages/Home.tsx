import React from "react";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import BetterForEveryone from "../components/BetterForEveryone";
import B2BSection from "../components/B2BSection";
import AppPromotion from "../components/AppPromotion";
import TrustSection from "../components/TrustSection";
import DistributorRetailer from "@/components/DistributorRetailer";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <section id="b2b" className="py-16">
        <B2BSection />
      </section>

      <main className="max-w-[1100px] mx-auto px-4 md:px-0">
        <section id="b2b" className="py-16">
          <DistributorRetailer />
        </section>

        <section id="features" className="py-16">
          <FeatureCards />
        </section>

        <section id="#trust-section" className="py-16">
          <BetterForEveryone />
        </section>

        <section id="better-for" className="py-12 border-t border-gray-100">
          <TrustSection />
        </section>
      </main>

      <div className="bg-[#FFFBF7] py-20 mt-16">
        <div className="max-w-[1100px] mx-auto px-4 md:px-0">
          <AppPromotion />
        </div>
      </div>
    </>
  );
};

export default Home;
