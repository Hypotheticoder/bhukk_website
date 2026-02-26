import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const AboutCTA: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-[#981A1E] to-[#E23744] rounded-[2.5rem] p-12 md:p-20 text-center text-white overflow-hidden"
        >
          {/* Decorative rings */}
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 border-[3px] border-white/10 rounded-full" />
          <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 border-[3px] border-white/10 rounded-full" />

          <h2 className="relative z-10 text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
            Be Part of the{" "}
            <span className="underline decoration-white/30 underline-offset-4">
              Revolution
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Whether you're a customer, store owner, distributor, or delivery
            partner — there's a place for you at Bhukk.
          </p>

          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => (window.location.hash = "store")}
              className="group bg-white text-[#981A1E] px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2 active:scale-[0.97]"
            >
              Partner With Us
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => (window.location.hash = "contact")}
              className="bg-white/15 backdrop-blur-sm border border-white/25 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/25 transition-all active:scale-[0.97]"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
