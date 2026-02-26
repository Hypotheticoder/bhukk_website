import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#E23744]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[400px] h-[400px] bg-[#981A1E]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8"
        >
          <Sparkles size={16} className="text-[#E23744]" />
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Reimagining How{" "}
          <span className="text-[#E23744]">India Drinks</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/70 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed"
        >
          We're building the most trusted, compliant, and tech-forward
          beverages delivery platform in the country — one city at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-sm font-semibold uppercase tracking-widest"
        >
          {["Legal", "Verified", "Hyperlocal", "Tech-First"].map((word, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E23744]" />
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
