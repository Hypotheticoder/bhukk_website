import React from "react";
import {
  Wallet,
  Calendar,
  ShieldCheck,
  Gift,
  ArrowRight,
  Smartphone,
  CheckCircle2,
  FileText,
  Zap,
  PlayCircle,
  Home as HomeIcon,
  Clock,
  MapPin,
} from "lucide-react";

interface DeliveryPartnerProps {
  onGoHome?: () => void;
}

const DeliveryPartner: React.FC<DeliveryPartnerProps> = ({ onGoHome }) => {
  return (
    <div className="pt-0">
      {/* Premium Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1C1C1C] overflow-hidden">
        {/* Background Image with optimized overlay */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center scale-105"
          style={{
            backgroundImage: 'url("/assets/background_delivery.png")',
          }}
        >
          {/* Multi-layered gradient for text readability and premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 mt-20">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#E23744] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              HIRING NOW ACROSS INDIA
            </div>

            <h1 className="text-white text-5xl md:text-7xl font-black mb-6 leading-[1.1] drop-shadow-lg">
              Drive Your Growth. <br />
              <span className="text-[#E23744]">Earn With Bhukk.</span>
            </h1>

            <p className="text-white/90 text-xl md:text-2xl font-medium mb-10 max-w-xl leading-relaxed drop-shadow-md">
              Join the elite league of delivery partners. Get flexible hours,
              instant payouts, and comprehensive insurance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="group w-full sm:w-auto bg-[#E23744] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#c62833] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                Register as Partner{" "}
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                <Smartphone size={22} /> Download App
              </button>
            </div>

            {/* Micro Stats */}
            <div className="mt-12 flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">Flexible Shifts</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">Daily Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#E23744]" />
                <span className="text-sm font-semibold">50+ Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Delivery Partner Content (preserve hero above) --- */}

      {/* How The Delivery App Works */}
      <section className="pt-16 pb-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C]">
              Your Work, Simplified
            </h2>
            <p className="text-[#696969] mt-3">
              A clear, safe flow — from accepting an order to quick payout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {[
                {
                  title: "Go Online",
                  desc: "Open the Bhukk Partner App and set your availability.",
                  emoji: "🟢",
                },
                {
                  title: "Accept Orders",
                  desc: "Receive requests from nearby licensed stores and accept jobs you want.",
                  emoji: "✅",
                },
                {
                  title: "Pick Up Securely",
                  desc: "Pick up sealed packages only from verified stores.",
                  emoji: "📦",
                },
                {
                  title: "Deliver Safely",
                  desc: "Follow navigation to verified addresses and handover to the verified customer.",
                  emoji: "🛵",
                },
                {
                  title: "Get Paid",
                  desc: "Transparent settlements — weekly and clear breakdowns in the app.",
                  emoji: "💸",
                },
              ].map((s, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#FFF5F6] text-[#E23744] flex items-center justify-center text-2xl font-black shadow-sm">
                    {s.emoji}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#1C1C1C]">
                      {s.title}
                    </h4>
                    <p className="text-[#6b6b6b] mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#f8fafc] p-6">
                <h5 className="text-sm font-bold text-[#1C1C1C] uppercase mb-4">
                  In-app views
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src="/assets/order_request.png"
                    alt="Order request"
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <img
                    src="/assets/navigation_screen.png"
                    alt="Navigation"
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <img
                    src="/assets/earnings_summary.png"
                    alt="Earnings"
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <img
                    src="/assets/support_button.png"
                    alt="Support"
                    className="w-full h-36 object-cover rounded-xl"
                  />
                </div>
                <p className="text-sm text-[#6b6b6b] mt-4">
                  Screenshots: order request, navigation, earnings summary, and
                  quick support access.
                </p>
              </div>

              <div className="text-sm text-[#6b6b6b]">
                Animations: subtle device float and button micro-interactions to
                signal live data in the app.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Benefits */}
      <section className="py-24 bg-[#FFFBF7]">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] mb-6">
            Why Deliver with Bhukk
          </h2>
          <p className="text-[#696969] mb-10">
            Built for safety, earnings, and flexibility.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: "Highest payout per delivery" },
              { icon: "🕒", title: "Flexible working hours" },
              { icon: "📍", title: "Hyperlocal deliveries" },
              { icon: "🛡️", title: "Safety-first operations" },
              { icon: "📲", title: "Easy-to-use partner app" },
              { icon: "⚡", title: "Fast weekly settlements" },
              { icon: "🎓", title: "Onboarding & training" },
              { icon: "🧾", title: "Clear rules & transparency" },
            ].map((b, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-sm text-left"
              >
                <div className="text-3xl mb-4">{b.icon}</div>
                <h4 className="font-bold text-lg text-[#1C1C1C]">{b.title}</h4>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#a33] mt-8">
            ⚠️ No alcohol consumption while on duty — only sealed package
            deliveries.
          </p>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-4">
          <h3 className="text-3xl font-black text-[#1C1C1C] text-center mb-6">
            Safety Comes First
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              {[
                "Helmet & ID mandatory",
                "Age-verified delivery only",
                "Sealed package pickups",
                "No cash handling (where possible)",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="text-[#E23744] mt-1">•</div>
                  <div className="text-[#6b6b6b]">{s}</div>
                </li>
              ))}
            </ul>

            <div className="bg-[#FFF5F6] p-6 rounded-2xl">
              <h4 className="font-bold text-xl mb-3">Support & Emergency</h4>
              <p className="text-[#6b6b6b]">
                24×7 partner support and an emergency help button inside the
                app. We work with local authorities and licensed stores to
                maintain compliance.
              </p>
            </div>
          </div>
          <p className="text-sm text-[#6b6b6b] mt-6 text-center">
            These measures build trust with regulators, families, and customers.
          </p>
        </div>
      </section>

      {/* Earnings & Payouts */}
      <section className="py-20 bg-[#FFFBF7]">
        <div className="max-w-[1100px] mx-auto px-4">
          <h3 className="text-3xl font-black text-[#1C1C1C] text-center mb-8">
            How Much Can You Earn?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-2xl">Base payout</h4>
              <p className="text-[#6b6b6b] mt-2">
                Calculated per order using distance, time, and demand.
                Transparent breakdown shown after every trip.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-2xl">Peak incentives</h4>
              <p className="text-[#6b6b6b] mt-2">
                Extra incentives during peak hours and high-demand zones to
                boost earnings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h4 className="font-extrabold text-2xl">Payout cycle</h4>
              <p className="text-[#6b6b6b] mt-2">
                Fast weekly settlements with clear ledger and dispute resolution
                in-app.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#6b6b6b] mt-6">
            ⚠️ Avoid exact ₹ promises unless guaranteed — earnings vary by city
            and demand.
          </p>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-black text-[#1C1C1C] mb-6">
              Who Can Join Bhukk?
            </h3>
            <ul className="space-y-3 text-[#6b6b6b]">
              {[
                "Age 21+",
                "Valid driving license",
                "Two-wheeler",
                "Smartphone (Android)",
                "Helmet",
                "Aadhaar & PAN",
                "Police verification (if required by state)",
              ].map((r, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="text-[#E23744]">✔</div>
                  <div>{r}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-black text-[#1C1C1C] mb-6">
              Documents Required
            </h3>
            <ul className="space-y-3 text-[#6b6b6b]">
              {[
                "Driving License",
                "Aadhaar Card",
                "PAN Card",
                "Vehicle RC",
                "Bank Account Details",
                "Profile Photo",
              ].map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="text-[#E23744] mt-1">•</div>
                  <div>{d}</div>
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#6b6b6b] mt-6">
              All documents are uploaded securely through the Partner app. No
              paperwork at pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 bg-[#E23744] text-white">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-4xl font-black">Start Delivering Today</h3>
            <p className="mt-3 text-lg text-white/90">
              Download the Delivery Partner app and start accepting orders in
              your city.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white text-[#1C1C1C] px-5 py-3 rounded-2xl font-bold shadow"
              >
                Get it on Google Play
              </a>
              <span className="text-sm text-white/90">Android only</span>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/assets/delivery_phone_mock.png"
              alt="Delivery app"
              className="w-64 rounded-3xl shadow-2xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-4">
          <h3 className="text-3xl font-black text-[#1C1C1C] text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {[
              {
                q: "Is alcohol handling safe?",
                a: "Yes. You only pick up sealed packages from licensed retailers and deliver to verified customers.",
              },
              {
                q: "Do I need to carry cash?",
                a: "Preferably no — most orders are prepaid. If cash is required, follow the app guidance.",
              },
              {
                q: "Can I choose my working hours?",
                a: "Yes — go online when you want to accept orders.",
              },
              {
                q: "What if I face an issue during delivery?",
                a: "Use the in-app support or the emergency help button to reach our operations team.",
              },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#FFFBF7]">
                <h4 className="font-bold">{f.q}</h4>
                <p className="text-[#6b6b6b] mt-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <footer className="py-8 bg-white border-t">
        <div className="max-w-[1100px] mx-auto px-4 text-sm text-[#6b6b6b]">
          <p className="mb-2">
            🔐 <strong>Disclaimer:</strong> Bhukk delivery partners do not sell
            alcohol. They only deliver sealed packages from licensed retailers
            to verified customers in accordance with local laws.
          </p>
          <p>
            If you have more questions or want help getting started, download
            the app and reach out via the Partner Support section.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DeliveryPartner;
