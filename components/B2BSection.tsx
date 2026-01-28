import React, { useState } from "react";
import {
  Zap,
  CheckCircle,
  BarChart2,
  Box,
  Bell,
  CreditCard,
} from "lucide-react";

const B2BSection: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    storeName: "",
    ownerName: "",
    phone: "",
    city: "",
    license: "",
  });

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <section className="bg-white text-[#1C1C1C] overflow-hidden">
      {/* HERO CTA */}
      <div className="max-w-[1100px] mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#E23744] rounded-full" />
              <span className="text-sm font-bold uppercase text-[#E23744]">
                Partner with Bhukk
              </span>
            </div>

            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-md">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Partner with Bhukk. Grow Your Liquor Business Digitally.
              </h2>
              <p className="text-[#696969] mb-6 max-w-xl">
                Join Bhukk’s B2B platform and reach thousands of nearby
                customers without investing in your own app, delivery team, or
                technology.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    window.location.hash = "partnership";
                    window.dispatchEvent(
                      new CustomEvent("navigate", { detail: "partnership" }),
                    );
                  }}
                  className="bg-[#E23744] text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#c62833]"
                >
                  Become a Partner
                </button>
                <button
                  onClick={() => {
                    window.location.hash = "contact";
                    window.dispatchEvent(
                      new CustomEvent("navigate", { detail: "contact" }),
                    );
                  }}
                  className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-semibold"
                >
                  Request a Demo
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Bhukk operates as a B2B platform by partnering with licensed
              liquor retailers to digitize sales, manage orders, and handle
              last-mile delivery efficiently.
            </p>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/assets/b2b1.png"
                alt="Store owner using tablet"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Better for Store Owners */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-extrabold mb-4">
              Better for Store Owners
            </h3>
            <p className="text-[#696969] mb-6">
              Bhukk helps licensed liquor stores digitize operations, manage
              orders efficiently, and grow sales by connecting them with local
              customers through a reliable delivery network.
            </p>

            <ul className="space-y-3">
              {[
                "Instant online presence in your locality",
                "Smart inventory & stock control",
                "Real-time order notifications",
                "No delivery management headache",
                "Secure and timely settlements",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <span className="text-white bg-[#E23744] rounded-full p-2">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="text-[#1C1C1C] font-medium group-hover:translate-x-2 transition-transform">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-sm">
              <img
                src="/assets/b2b2.png"
                alt="Store visual"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Merchant Dashboard */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <h3 className="text-3xl font-extrabold text-center mb-6">
          Powerful Merchant Dashboard
        </h3>
        <p className="text-center text-[#696969] mb-8">
          Manage your store operations from a single dashboard designed for
          speed, clarity, and control.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-md">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Box className="w-6 h-6 text-[#E23744]" />,
                  title: "Live order tracking",
                },
                {
                  icon: <BarChart2 className="w-6 h-6 text-[#E23744]" />,
                  title: "Sales & revenue analytics",
                },
                {
                  icon: <CreditCard className="w-6 h-6 text-[#E23744]" />,
                  title: "Automated billing & settlements",
                },
                {
                  icon: <Bell className="w-6 h-6 text-[#E23744]" />,
                  title: "Instant order alerts",
                },
              ].map((c, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">{c.icon}</div>
                    <div>
                      <h4 className="font-bold">{c.title}</h4>
                      <p className="text-sm text-gray-500">
                        Quick insights and easy actions
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-xl">
              <div className="h-48 bg-gradient-to-r from-[#E23744]/10 to-transparent rounded-lg mb-4 flex items-end p-4">
                <div className="flex gap-2 w-full h-full items-end justify-around">
                  {[60, 30, 80, 50, 70].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 bg-[#E23744] rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-gray-50 rounded-lg p-3">
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-5 w-32 bg-gray-100 rounded" />
                </div>
                <div className="h-20 bg-gray-50 rounded-lg p-3">
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-5 w-32 bg-gray-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* B2B Onboarding Form */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-extrabold mb-2">
                Get Started in Minutes
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Submit minimal details, upload license, and get verified to
                start receiving orders.
              </p>

              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-4">
                <div
                  className="h-3 bg-[#E23744] rounded-full transition-all"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>

              <ol className="text-sm text-gray-600 space-y-2">
                <li>1. Submit store details</li>
                <li>2. Upload license & documents</li>
                <li>3. Get verified by Bhukk</li>
                <li>4. Start receiving orders</li>
              </ol>
            </div>

            <div className="md:flex-1 mt-6 md:mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="space-y-4"
              >
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      value={form.storeName}
                      onChange={(e) =>
                        setForm({ ...form, storeName: e.target.value })
                      }
                      placeholder="Store Name"
                      className="px-4 py-3 rounded-xl border bg-gray-50"
                    />
                    <input
                      value={form.ownerName}
                      onChange={(e) =>
                        setForm({ ...form, ownerName: e.target.value })
                      }
                      placeholder="Owner Name"
                      className="px-4 py-3 rounded-xl border bg-gray-50"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Phone Number"
                      className="px-4 py-3 rounded-xl border bg-gray-50"
                    />
                    <input
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      placeholder="City & Area"
                      className="px-4 py-3 rounded-xl border bg-gray-50"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      License Number
                    </label>
                    <input
                      value={form.license}
                      onChange={(e) =>
                        setForm({ ...form, license: e.target.value })
                      }
                      placeholder="License Number"
                      className="w-full px-4 py-3 rounded-xl border bg-gray-50"
                    />
                    <label className="text-sm text-gray-600">
                      Upload License (PDF/Image)
                    </label>
                    <input type="file" className="w-full" />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3">
                    <h4 className="font-bold">Review & Submit</h4>
                    <p className="text-sm text-gray-600">
                      We will review your submission and contact you within 48
                      hours.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prev}
                      className="px-4 py-2 rounded-lg border"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 && (
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#E23744] text-white"
                    >
                      Next
                    </button>
                  )}
                  {step === 4 && (
                    <button
                      type="button"
                      onClick={() => alert("Application submitted")}
                      className="px-6 py-3 rounded-xl bg-[#E23744] text-white"
                    >
                      Apply as Store Partner
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 flex gap-4">
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm">
                  Secure verification
                </div>
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm">
                  Data protected
                </div>
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm">
                  Compliance-first platform
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Social Proof */}
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <h3 className="text-2xl font-extrabold text-center mb-4">
          Why Stores Choose Bhukk
        </h3>
        <p className="text-center text-gray-500 mb-8">
          Trusted by stores across India — see the results for yourself.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h4 className="text-3xl font-extrabold">30%</h4>
            <p className="text-sm text-gray-500">Increase in monthly orders</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h4 className="text-3xl font-extrabold">Zero</h4>
            <p className="text-sm text-gray-500">
              Delivery investment required
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow text-center">
            <h4 className="text-3xl font-extrabold">500+</h4>
            <p className="text-sm text-gray-500">Partner stores and counting</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BSection;
