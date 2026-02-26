import React from "react";
import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2024",
    title: "The Idea Was Born",
    description:
      "Frustrated by the lack of a legal, tech-enabled beverages delivery option in India, our founders set out to build one.",
  },
  {
    year: "2024",
    title: "First Prototype",
    description:
      "Built the first working prototype — a hyperlocal marketplace connecting licensed stores with customers.",
  },
  {
    year: "2025",
    title: "Launched in Kolkata",
    description:
      "Bhukk went live in Kolkata with a curated network of licensed retailers and trained delivery partners.",
  },
  {
    year: "2025",
    title: "B2B Platform Launch",
    description:
      "Rolled out distributor-retailer connections, enabling direct business relationships on the platform.",
  },
  {
    year: "2026",
    title: "Expanding Across India",
    description:
      "Scaling to 50+ cities with a growing team, deeper compliance tooling, and a rapidly expanding partner network.",
  },
];

const AboutStory: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-[#FFF1F2] text-[#981A1E] rounded-full mb-4">
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight">
            Our Story So Far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-[#E23744] rounded-full -translate-x-1/2 mt-2 ring-4 ring-white z-10" />

                  {/* Content */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <span className="inline-block text-xs font-black tracking-widest text-[#E23744] bg-[#FFF1F2] px-3 py-1 rounded-full mb-3">
                      {m.year}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1C1C1C] mb-2">
                      {m.title}
                    </h3>
                    <p className="text-[#696969] leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
