import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: "easeOut" },
  }),
};

const AboutMission: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-[#FFF1F2] text-[#981A1E] rounded-full mb-4">
            Why We Exist
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight">
            Mission & Vision
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={card}
            className="group relative bg-gradient-to-br from-[#981A1E] to-[#c62833] p-10 md:p-14 rounded-[2rem] text-white overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h3 className="text-3xl font-black mb-4">Our Mission</h3>
              <p className="text-white/85 text-lg leading-relaxed">
                To provide every Indian adult a{" "}
                <strong>safe, legal, and convenient</strong> way to discover and
                order premium beverages — while empowering local retailers,
                distributors, and delivery partners with technology that grows
                their business.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={card}
            className="group relative bg-[#1C1C1C] p-10 md:p-14 rounded-[2rem] text-white overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E23744]/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Eye size={28} />
              </div>
              <h3 className="text-3xl font-black mb-4">Our Vision</h3>
              <p className="text-white/75 text-lg leading-relaxed">
                To become India's most{" "}
                <strong>trusted beverages delivery ecosystem</strong> — setting
                the gold standard for compliance, speed, and customer experience
                across every city we operate in.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
