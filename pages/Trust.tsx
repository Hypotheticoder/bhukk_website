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

const Trust: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-[#FBFBFA]">
      <main className="max-w-[1100px] mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#1C1C1C]">
            Your Local Stores. One Trusted Platform.
          </h1>
          <p className="mt-4 text-lg text-[#696969] max-w-3xl mx-auto">
            Bhukk makes discovering and ordering premium liquor simple, safe,
            and fully compliant — by connecting customers only with verified
            local stores and ensuring responsible delivery at every step.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-3 mb-12">
          <article className="bg-white p-8 rounded-2xl shadow-lg">
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

          <article className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-[#1C1C1C] text-white rounded-lg flex items-center justify-center mb-4">
              <MapPin />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Local Stores</h3>
            <p className="text-sm text-[#696969] mb-3">
              Shop from trusted, verified liquor stores in your locality — no
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

          <article className="bg-white p-8 rounded-2xl shadow-lg">
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
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-lg mb-12">
          <h3 className="text-2xl font-bold mb-4">
            Additional Customer Benefits
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#F6F6F6] rounded-lg">
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
              <div className="p-3 bg-[#F6F6F6] rounded-lg">
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
              <div className="p-3 bg-[#F6F6F6] rounded-lg">
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
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-bold mb-3">About Bhukk</h3>
          <p className="text-sm text-[#696969]">
            Bhukk offers customers a safe and convenient way to discover and
            order premium liquor from verified local stores. Every order is
            handled responsibly — from age verification to sealed delivery —
            ensuring compliance with local laws while delivering a smooth,
            reliable experience right to your doorstep.
          </p>
        </section>

        <footer className="text-sm text-[#696969]">
          <p className="mb-2">
            <strong>Legal & Trust Disclaimer:</strong> Bhukk does not sell
            alcohol directly. All alcohol sales are fulfilled by licensed retail
            partners in accordance with applicable laws.
          </p>
          <p className="flex items-center gap-2">
            <Headset />{" "}
            <span>
              Need help? Visit our support or contact us for order assistance.
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Trust;
