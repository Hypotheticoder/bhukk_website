
import React from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';
import BetterForEveryone from '../components/BetterForEveryone';
import B2BSection from '../components/B2BSection';
import AppPromotion from '../components/AppPromotion';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <main className="max-w-[1100px] mx-auto px-4 md:px-0">
        <section id="features" className="py-16">
          <FeatureCards />
        </section>

        <section id="better-for" className="py-12 border-t border-gray-100">
          <BetterForEveryone />
        </section>

        <section id="b2b" className="py-16">
          <B2BSection />
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
