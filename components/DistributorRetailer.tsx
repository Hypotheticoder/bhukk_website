import React from "react";
import {
  Users,
  Store,
  Truck,
  Repeat,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const DistributorRetailer: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-[#FFFBF7] text-[#E23744] rounded-full border border-[#f5eee6]">
            The Ecosystem
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#1C1C1C] leading-[1.1] tracking-tight">
            Distributors & Retailers <br />
            <span className="text-[#696969]">Direct. Compliant. Simple.</span>
          </h2>
          <p className="mt-6 text-xl text-[#696969] leading-relaxed max-w-2xl">
            Bhukk is a neutral digital bridge connecting licensed partners to
            customers — helping businesses grow based on real demand, not
            guesswork.
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-20">
          {/* Card 1 */}
          <article className="group relative bg-[#FFFBF7] p-10 rounded-[32px] border border-[#f5eee6] transition-all duration-500 hover:shadow-2xl hover:shadow-[#E23744]/5 hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#E23744] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#E23744]/20 group-hover:scale-110 transition-transform">
              <Store size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">
              Distributors ↔ Retailers
            </h3>
            <p className="text-[#696969] mb-8 leading-relaxed">
              Discover active retailers in your zones and connect directly.
              Filter by location, license status and product availability.
            </p>
            <ul className="space-y-4">
              {[
                "Expand your retail network quickly",
                "Real demand drives connections",
                "Direct contact through Bhukk",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-[#1C1C1C]"
                >
                  <CheckCircle2 size={18} className="text-[#E23744]" /> {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Card 2 */}
          <article className="group relative bg-white p-10 rounded-[32px] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#1C1C1C] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">
              Retailers → Customers
            </h3>
            <p className="text-[#696969] mb-8 leading-relaxed">
              Every registered store gets instant market access — appear for
              nearby customers based on verified license and availability.
            </p>
            <ul className="space-y-4">
              {[
                "Sell beyond walk-ins",
                "Build a digital presence instantly",
                "Orders flow directly to stores",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-[#1C1C1C]"
                >
                  <CheckCircle2 size={18} className="text-[#1C1C1C]" /> {item}
                </li>
              ))}
            </ul>
          </article>

          {/* Card 3 */}
          <article className="group relative bg-white p-10 rounded-[32px] border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-[#E6A23C]/5 hover:-translate-y-2">
            <div className="w-14 h-14 bg-[#E6A23C] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#E6A23C]/20 group-hover:scale-110 transition-transform">
              <Truck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#1C1C1C]">
              Distributors ↔ Store Owners
            </h3>
            <p className="text-[#696969] mb-8 leading-relaxed">
              No lock-ins — distributors and store owners connect freely for
              better pricing, faster restocking and healthier competition.
            </p>
            <ul className="space-y-4">
              {[
                "Freedom of choice for stores",
                "Faster restocking cycles",
                "Transparent relationships",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-[#1C1C1C]"
                >
                  <CheckCircle2 size={18} className="text-[#E6A23C]" /> {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-stretch">
          <div className="bg-white border border-gray-100 p-10 rounded-[32px] flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-[#1C1C1C]">
                Retailers ↔ Retailers{" "}
                <span className="text-[#9C9C9C] font-normal text-lg">
                  (Optional)
                </span>
              </h4>
              <p className="text-[#696969] mb-10 leading-relaxed">
                Optional peer-to-peer connections help stores temporarily source
                stock or recommend trusted distributors. Fully permissioned and
                license-bound.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[
                "https://images.unsplash.com/photo-1542736667-069246bdbc6d?auto=format&fit=crop&q=80&w=420",
                "https://images.unsplash.com/photo-1556740763-90ea3b7448a9?auto=format&fit=crop&q=80&w=420",
                "https://images.unsplash.com/photo-1529335764851-94d0f2aa3d2b?auto=format&fit=crop&q=80&w=420",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl group flex-1"
                >
                  <img
                    src={src}
                    alt="Network"
                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1C1C1C] p-10 rounded-[32px] text-white">
            <h4 className="text-2xl font-bold mb-6">How Bhukk Helps</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E23744] transition-colors">
                  <Repeat size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg">Two-way connections</div>
                  <div className="text-gray-400 text-sm mt-1 leading-relaxed">
                    Distributors, retailers and delivery partners connect
                    directly without friction.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E23744] transition-colors">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg">Local discovery</div>
                  <div className="text-gray-400 text-sm mt-1 leading-relaxed">
                    Stores surface for customers based on location and license
                    validity.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#E23744] transition-colors">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <div className="font-bold text-lg">Direct contact</div>
                  <div className="text-gray-400 text-sm mt-1 leading-relaxed">
                    Reach out through Bhukk — no cold calls, no intermediaries
                    needed.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Website-ready footer copy */}
        <div className="mt-16 pt-10 border-t border-gray-100 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-[#E23744] font-bold text-sm uppercase tracking-widest mb-2">
              For Distributors
            </p>
            <p className="text-[#696969] text-sm leading-relaxed">
              Discover and connect with verified liquor retailers in your
              operating areas. Expand your network, understand real demand, and
              build direct business relationships.
            </p>
          </div>
          <div>
            <p className="text-[#1C1C1C] font-bold text-sm uppercase tracking-widest mb-2">
              For Retailers
            </p>
            <p className="text-[#696969] text-sm leading-relaxed">
              Connect with multiple licensed distributors, reach new customers
              instantly, and manage your business digitally — all from one
              platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistributorRetailer;
