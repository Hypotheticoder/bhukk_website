import React from "react";
import { CheckCircle2 } from "lucide-react";

type Section = {
  title: string;
  page: "home" | "store" | "partner";
  anchor?: string;
  description: string;
  image: string;
  features: string[];
};

const SECTIONS: Section[] = [
  {
    title: "Better for Customers",
    page: "home",
    anchor: "trust",
    description:
      "Enjoy a curated selection of premium beverages delivered to your doorstep in minutes, not hours.",
    image:
      "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=600",
    features: [
      "Safe & Legal Delivery",
      "Verified Local Stores",
      "Secure Age Verification",
    ],
  },
  {
    title: "Better for Store Owners",
    page: "store",
    description:
      "Digitize your shop and reach thousands of new customers in your locality with zero hassle.",
    image: "/assets/store_owner.png",
    features: [
      "Instant Online Presence",
      "Smart Inventory Tracking",
      "Real-time Order Dashboard",
    ],
  },
  {
    title: "Better for Delivery Partners",
    page: "partner",
    description:
      "Earn more with flexible timings, professional training, and industry-standard insurance coverage.",
    image: "/assets/delivery_partner.png",
    features: [
      "Highest Payout Per Trip",
      "Flexible Work Hours",
      "Safety First Equipment",
    ],
  },
];

const BetterForEveryone: React.FC = () => {
  /**
   * Handles Learn More click
   *
   * RULES:
   * - Hash = PAGE ONLY
   * - Never put section IDs in hash
   * - Scroll only via DOM
   */
  const handleLearnMore = (page: Section["page"], anchor?: string) => {
    // CASE 1: Scroll to section on Home
    if (page === "home" && anchor) {
      const el = document.getElementById(anchor);

      // Already on Home → scroll directly
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      // Not on Home → navigate first, then scroll
      window.location.hash = "home";

      setTimeout(() => {
        document
          .getElementById(anchor)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);

      return;
    }

    // CASE 2: Normal page navigation
    window.location.hash = page;
  };

  return (
    <section className="space-y-24 overflow-hidden">
      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <h2 className="text-4xl font-bold text-[#1C1C1C] mb-4">
          Better for everyone
        </h2>
        <div className="w-16 h-1 bg-[#E23744] mx-auto rounded-full" />
      </div>

      {/* Sections */}
      {SECTIONS.map((section, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={section.title}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              !isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`flex-1 opacity-0 ${
                isEven ? "animate-fade-in-left" : "animate-fade-in-right"
              }`}
              style={{
                animationFillMode: "forwards",
                animationDelay: "200ms",
              }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#F8F8F8] rounded-3xl -z-10 transition-transform group-hover:scale-105" />
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Content */}
            <div
              className={`flex-1 space-y-6 opacity-0 ${
                isEven ? "animate-fade-in-right" : "animate-fade-in-left"
              }`}
              style={{
                animationFillMode: "forwards",
                animationDelay: "400ms",
              }}
            >
              <h3 className="text-3xl font-bold text-[#1C1C1C] flex items-center gap-3">
                <span className="w-2 h-8 bg-[#E23744] rounded-full" />
                {section.title}
              </h3>

              <p className="text-[#696969] text-lg leading-relaxed">
                {section.description}
              </p>

              <ul className="space-y-4">
                {section.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-[#1C1C1C] font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#E23744]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleLearnMore(section.page, section.anchor)}
                className="mt-4 px-8 py-3 bg-white border border-[#E23744] text-[#E23744] font-semibold rounded-lg hover:bg-[#E23744] hover:text-white transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default BetterForEveryone;
