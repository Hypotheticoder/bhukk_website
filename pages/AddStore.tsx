import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Store,
  Factory,
  Building2,
  CheckCircle2,
  Zap,
  BarChart2,
  Truck,
  ShieldCheck,
  Globe,
  Users,
  CreditCard,
  TrendingUp,
  Package,
  Repeat,
  Smartphone,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PARTNER_TYPES = [
  {
    id: "retailer",
    hash: "retailer-form",
    icon: <Store size={32} />,
    color: "bg-[#E23744]",
    shadow: "shadow-[#E23744]/20",
    title: "Retailers",
    tagline: "Sell More. Digitally.",
    description:
      "List your licensed beverages store on Bhukk and reach thousands of nearby customers without building your own app or delivery fleet.",
    benefits: [
      "Instant online store presence in your locality",
      "Real-time order notifications & dashboard",
      "Smart inventory & stock control",
      "No delivery management headache — we handle it",
      "Secure & timely weekly settlements",
      "Dedicated account manager & onboarding support",
    ],
    cta: "Apply as Retailer",
  },
  {
    id: "distributor",
    hash: "distributor-form",
    icon: <Building2 size={32} />,
    color: "bg-[#1C1C1C]",
    shadow: "shadow-black/10",
    title: "Distributors",
    tagline: "Expand. Connect. Grow.",
    description:
      "Join Bhukk as a licensed distributor and get direct access to verified retailers across your zones — powered by real demand data.",
    benefits: [
      "Direct access to verified retailers in your area",
      "Real-time demand data & zone analytics",
      "Expand your retail network quickly",
      "Fast, transparent settlements",
      "Dedicated relationship manager",
      "Compliance-first digital onboarding",
    ],
    cta: "Apply as Distributor",
  },
  {
    id: "manufacturer",
    hash: "manufacturer-form",
    icon: <Factory size={32} />,
    color: "bg-[#E6A23C]",
    shadow: "shadow-[#E6A23C]/20",
    title: "Manufacturers",
    tagline: "Scale Your Reach.",
    description:
      "Connect directly with hundreds of distributors and retailers across India and let Bhukk power your go-to-market strategy.",
    benefits: [
      "Direct-to-retailer & distributor channels",
      "Demand analytics by region & product category",
      "Brand visibility to end consumers",
      "Product catalog showcased on the platform",
      "Compliance-first partner onboarding",
      "Dedicated brand partnership team",
    ],
    cta: "Apply as Manufacturer",
  },
];

const WHY_BHUKK = [
  {
    icon: <Users size={28} />,
    title: "Access New Customers",
    desc: "Get discovered by people actively searching for beverages in your neighbourhood.",
  },
  {
    icon: <Truck size={28} />,
    title: "Seamless Delivery Network",
    desc: "Leverage Bhukk's trained delivery partners for fast & compliant order fulfilment.",
  },
  {
    icon: <BarChart2 size={28} />,
    title: "Powerful Dashboard",
    desc: "Track orders, revenue, inventory and settlements from one clean interface.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "100 % Compliant",
    desc: "Every partner is license-verified. Every delivery follows local excise laws.",
  },
  {
    icon: <CreditCard size={28} />,
    title: "Timely Settlements",
    desc: "Clear weekly payouts with transparent line-item breakdowns.",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Grow with Data",
    desc: "Real demand signals, zone analytics, and customer insights to fuel growth.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Apply Online",
    desc: "Fill a quick form with business details & documents.",
  },
  {
    step: "02",
    title: "Get Verified",
    desc: "Our team reviews your license, identity & store/facility.",
  },
  {
    step: "03",
    title: "Onboard & Go Live",
    desc: "Complete training, set up your dashboard, and start receiving orders.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const AddStore: React.FC = () => {
  return (
    <div className="pt-0 overflow-x-hidden">
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="absolute top-[-15%] left-[-8%] w-[500px] h-[500px] bg-[#E23744]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#E6A23C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8"
          >
            <Zap size={16} className="text-[#E23744]" />
            Partner With Bhukk
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6"
          >
            Grow Your Business <span className="text-[#E23744]">With Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're a retailer, distributor, or manufacturer — Bhukk
            gives you the tech, the customers, and the compliance layer to scale
            your beverages business digitally.
          </motion.p>

          {/* Quick CTA chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {PARTNER_TYPES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  document
                    .getElementById(`section-${p.id}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-3 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-white hover:text-[#1C1C1C] transition-all active:scale-[0.97]"
              >
                {p.icon}
                {p.title}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== PARTNER TYPE SECTIONS ===================== */}
      {PARTNER_TYPES.map((p, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={p.id}
            id={`section-${p.id}`}
            className={`py-24 ${isEven ? "bg-white" : "bg-[#FBFBFA]"}`}
          >
            <div className="max-w-[1100px] mx-auto px-6">
              <div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-16 items-center`}
              >
                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="flex-1 space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 ${p.color} text-white rounded-2xl flex items-center justify-center shadow-lg ${p.shadow}`}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C] tracking-tight">
                        {p.title}
                      </h2>
                      <p className="text-[#696969] font-medium">{p.tagline}</p>
                    </div>
                  </div>

                  <p className="text-[#696969] text-lg leading-relaxed max-w-xl">
                    {p.description}
                  </p>

                  <ul className="space-y-4">
                    {p.benefits.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-[#E23744] mt-0.5 flex-shrink-0"
                        />
                        <span className="text-[#1C1C1C] font-medium">{b}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <button
                    onClick={() => (window.location.hash = p.hash)}
                    className={`group inline-flex items-center gap-3 ${p.color} text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:opacity-90 transition-all active:scale-[0.97]`}
                  >
                    {p.cta}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </motion.div>

                {/* Visual Side */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="flex-1 w-full"
                >
                  <PartnerVisual type={p.id} />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ===================== WHY BHUKK ===================== */}
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
              Platform Benefits
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] tracking-tight">
              Why Partners Choose Bhukk
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_BHUKK.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#FBFBFA] p-8 rounded-[1.5rem] border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-[#1C1C1C] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#696969] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-24 bg-[#1C1C1C]">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-white/50 text-lg">
              Three simple steps to join the Bhukk partner ecosystem.
            </p>
          </motion.div>

          <div className="space-y-10">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-8"
              >
                <div className="text-5xl font-black text-[#E23744]/30 leading-none select-none">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#981A1E] to-[#E23744] rounded-[2.5rem] p-12 md:p-20 text-center text-white overflow-hidden"
          >
            <div className="absolute top-[-60px] right-[-60px] w-48 h-48 border-[3px] border-white/10 rounded-full" />
            <div className="absolute bottom-[-40px] left-[-40px] w-32 h-32 border-[3px] border-white/10 rounded-full" />

            <h2 className="relative z-10 text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Ready to Partner?
            </h2>
            <p className="relative z-10 text-white/80 text-lg md:text-xl max-w-xl mx-auto mb-10">
              Choose your business type and fill a quick application. Our team
              will get back to you within 48 hours.
            </p>

            <div className="relative z-10 flex flex-wrap justify-center gap-4">
              {PARTNER_TYPES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => (window.location.hash = p.hash)}
                  className="group bg-white text-[#981A1E] px-7 py-4 rounded-xl font-bold text-base hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2 active:scale-[0.97]"
                >
                  {p.icon}
                  {p.cta}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Visual cards for each partner type                                 */
/* ------------------------------------------------------------------ */

function PartnerVisual({ type }: { type: string }) {
  if (type === "retailer") {
    return (
      <div className="bg-[#FBFBFA] rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-widest">
            Retailer Dashboard Preview
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Package size={22} />, label: "Live Orders", value: "24" },
            {
              icon: <TrendingUp size={22} />,
              label: "Today's Revenue",
              value: "₹18,400",
            },
            {
              icon: <Smartphone size={22} />,
              label: "App Orders",
              value: "89%",
            },
            {
              icon: <CreditCard size={22} />,
              label: "Settlement",
              value: "₹1.2L",
            },
          ].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
              <div className="text-[#E23744] mb-2">{s.icon}</div>
              <div className="text-2xl font-black text-[#1C1C1C]">
                {s.value}
              </div>
              <div className="text-xs text-[#696969] font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="h-28 bg-gradient-to-r from-[#E23744]/10 to-transparent rounded-xl flex items-end p-4">
          <div className="flex gap-2 w-full items-end justify-around">
            {[55, 30, 70, 45, 80, 60, 75].map((h, i) => (
              <div
                key={i}
                className="w-4 bg-[#E23744] rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "distributor") {
    return (
      <div className="bg-[#1C1C1C] rounded-[2rem] p-8 text-white space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#E23744] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">
            Distributor Network
          </span>
        </div>
        <div className="space-y-5">
          {[
            {
              icon: <Globe size={20} />,
              title: "Zone Analytics",
              desc: "Track demand across 50+ cities in real-time.",
            },
            {
              icon: <Repeat size={20} />,
              title: "Retailer Connections",
              desc: "Direct access to 5,000+ verified stores.",
            },
            {
              icon: <CreditCard size={20} />,
              title: "Fast Settlements",
              desc: "Weekly payouts with transparent breakdowns.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 group">
              <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E23744] transition-colors">
                {item.icon}
              </div>
              <div>
                <div className="font-bold text-lg">{item.title}</div>
                <div className="text-gray-400 text-sm mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // manufacturer
  return (
    <div className="bg-[#FFFBF7] rounded-[2rem] p-8 border border-[#f5eee6] space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-3 h-3 rounded-full bg-[#E6A23C] animate-pulse" />
        <span className="text-xs font-bold text-[#1C1C1C] uppercase tracking-widest">
          Manufacturer Insights
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Retailers Reached", value: "2,400+" },
          { label: "Cities Active", value: "35" },
          { label: "Brands Listed", value: "120+" },
          { label: "Monthly Orders", value: "50K+" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm text-center"
          >
            <div className="text-2xl font-black text-[#E6A23C]">{s.value}</div>
            <div className="text-xs text-[#696969] font-medium mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-5 space-y-3">
        <div className="text-sm font-bold text-[#1C1C1C]">Demand by Region</div>
        {[
          { region: "West Bengal", pct: 85 },
          { region: "Maharashtra", pct: 72 },
          { region: "Delhi NCR", pct: 60 },
          { region: "Karnataka", pct: 48 },
        ].map((r, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs text-[#696969]">
              <span>{r.region}</span>
              <span className="font-bold">{r.pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full bg-[#E6A23C] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddStore;
