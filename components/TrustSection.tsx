import React from "react";
import {
  ShieldCheck,
  CheckCircle,
  MapPin,
  UserCheck,
  Truck,
  Package,
  Smartphone,
  Headset,
} from "lucide-react";

const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 md:px-0">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-[#1C1C1C]">
            Your Local Stores. One Trusted Platform.
          </h2>
          <p className="mt-3 text-lg text-[#696969] max-w-3xl mx-auto">
            Bhukk makes discovering and ordering premium beverages simple, safe,
            and fully compliant — by connecting customers only with verified
            local stores and ensuring responsible delivery at every step.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <article className="bg-[#FBFBFA] p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#E23744] text-white rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-bold mb-2">Safe & Legal Delivery</h3>
            <p className="text-sm text-[#696969] mb-3">
              Every order is fulfilled by a licensed store and delivered in
              compliance with local excise regulations.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Orders fulfilled only
                by licensed retailers
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Deliveries follow
                state excise laws
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> No unverified sellers
              </li>
            </ul>
          </article>

          <article className="bg-[#FBFBFA] p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#1C1C1C] text-white rounded-lg flex items-center justify-center mb-4">
              <MapPin />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Local Stores</h3>
            <p className="text-sm text-[#696969] mb-3">
              Shop from trusted, verified beverages stores in your locality — no
              unknown sellers, no surprises.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Licenses, address &
                identity verified
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Inventory from
                trusted local sellers
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Faster hyperlocal
                delivery
              </li>
            </ul>
          </article>

          <article className="bg-[#FBFBFA] p-8 rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#E6A23C] text-white rounded-lg flex items-center justify-center mb-4">
              <UserCheck />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Age Verification</h3>
            <p className="text-sm text-[#696969] mb-3">
              Bhukk follows strict age-verification protocols to ensure
              responsible and lawful delivery.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> Age verification
                during ordering
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> ID check at delivery
                where required
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-500" /> No deliveries to
                underage customers
              </li>
            </ul>
          </article>
        </div>

        <div className="bg-[#FBFBFA] p-8 rounded-2xl shadow-sm mb-8">
          <h4 className="text-xl font-bold mb-3">
            Additional Customer Benefits
          </h4>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Truck />
              </div>
              <div>
                <p className="font-semibold">Fast, Hyperlocal Delivery</p>
                <p className="text-sm text-[#696969]">
                  Nearby stores = quicker fulfillment — minutes, not hours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Package />
              </div>
              <div>
                <p className="font-semibold">Sealed & Secure Packaging</p>
                <p className="text-sm text-[#696969]">
                  Tamper-proof packaging — no open or loose items.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Smartphone />
              </div>
              <div>
                <p className="font-semibold">Easy Ordering Experience</p>
                <p className="text-sm text-[#696969]">
                  Clean interface, transparent pricing, real-time updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#696969]">
          Bhukk offers customers a safe and convenient way to discover and order
          premium beverages from verified local stores. Every order is handled
          responsibly — from age verification to sealed delivery — ensuring
          compliance with local laws while delivering a smooth, reliable
          experience right to your doorstep.
        </p>

        <p className="text-xs text-[#999] mt-6">
          Legal & Trust Disclaimer: Bhukk does not sell alcohol directly. All
          alcohol sales are fulfilled by licensed retail partners in accordance
          with applicable laws.
        </p>
      </div>
    </section>
  );
};

export default TrustSection;
