import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Heart,
  Scale,
  Users,
  Leaf,
} from "lucide-react";

const VALUES = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Compliance First",
    description:
      "Every transaction on Bhukk follows local excise laws and age-verification protocols — no exceptions.",
    color: "bg-[#E23744]",
  },
  {
    icon: <Zap size={28} />,
    title: "Speed & Reliability",
    description:
      "Hyperlocal fulfillment means your order reaches you in minutes, not hours. Technology keeps us fast.",
    color: "bg-[#1C1C1C]",
  },
  {
    icon: <Heart size={28} />,
    title: "Customer Obsession",
    description:
      "We design every feature — from search to delivery — around what makes life easier for our customers.",
    color: "bg-[#E6A23C]",
  },
  {
    icon: <Scale size={28} />,
    title: "Fair & Transparent",
    description:
      "Transparent pricing, honest settlements for partners, and clear policies you can trust.",
    color: "bg-[#981A1E]",
  },
  {
    icon: <Users size={28} />,
    title: "Empowering Partners",
    description:
      "Retailers, distributors, and delivery partners are our backbone. Their growth is our growth.",
    color: "bg-[#1C1C1C]",
  },
  {
    icon: <Leaf size={28} />,
    title: "Responsible Innovation",
    description:
      "We innovate responsibly — building tech that promotes safe consumption and sustainable operations.",
    color: "bg-[#16A34A]",
  },
];

const AboutValues: React.FC = () => {
  return (
    <section className="py-24 bg-[#FFFBF7]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-white text-[#981A1E] rounded-full border border-[#f5eee6] mb-4">
            What Drives Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight">
            Our Core Values
          </h2>
          <p className="mt-4 text-[#696969] text-lg max-w-2xl mx-auto">
            These principles shape every decision we make — from product design
            to partner relationships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white p-8 rounded-[1.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <div
                className={`w-14 h-14 ${value.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">
                {value.title}
              </h3>
              <p className="text-[#696969] text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
