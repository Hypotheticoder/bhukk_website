import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const STATS = [
  { value: 50, suffix: "+", label: "Cities Targeted" },
  { value: 5000, suffix: "+", label: "Partner Stores" },
  { value: 10000, suffix: "+", label: "Delivery Partners" },
  { value: 99, suffix: "%", label: "Compliance Rate" },
];

function AnimatedNumber({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = duration / (target / step);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-5xl md:text-6xl font-black tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const AboutStats: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#1C1C1C] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#E23744]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Bhukk in Numbers
          </h2>
          <p className="mt-4 text-white/50 text-lg">
            Growing fast, staying compliant.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="text-[#E23744]">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p className="mt-3 text-white/60 text-sm font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
