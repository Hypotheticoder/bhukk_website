import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  Truck,
  Briefcase,
  ChevronRight,
  Info,
  CheckCircle,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import B2BSection from "@/components/B2BSection";
import { sendPartnerMessage } from "@/api/services/partner.service";

const COUNTRIES = [
  {
    code: "IN",
    name: "India",
    dial: "+91",
    flag: "https://flagcdn.com/w20/in.png",
  },
  {
    code: "US",
    name: "United States",
    dial: "+1",
    flag: "https://flagcdn.com/w20/us.png",
  },
  {
    code: "GB",
    name: "United Kingdom",
    dial: "+44",
    flag: "https://flagcdn.com/w20/gb.png",
  },
  {
    code: "AE",
    name: "UAE",
    dial: "+971",
    flag: "https://flagcdn.com/w20/ae.png",
  },
  {
    code: "SG",
    name: "Singapore",
    dial: "+65",
    flag: "https://flagcdn.com/w20/sg.png",
  },
];

const AddStore: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);

  // file inputs
  const [beveragesLicenseFile, setbeveragesLicenseFile] = useState<File | null>(
    null,
  );
  const [businessRegFile, setBusinessRegFile] = useState<File | null>(null);
  const [ownerIdFiles, setOwnerIdFiles] = useState<File[] | null>(null);
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
  const [storePhotos, setStorePhotos] = useState<File[] | null>(null);

  // refs to clear file inputs after submit
  const beveragesRef = useRef<HTMLInputElement | null>(null);
  const businessRegRef = useRef<HTMLInputElement | null>(null);
  const ownerIdRef = useRef<HTMLInputElement | null>(null);
  const addressProofRef = useRef<HTMLInputElement | null>(null);
  const storePhotosRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!termsAccepted) {
      setSubmitError("You must accept the terms to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("first_name", firstName);
      form.append("last_name", lastName);
      form.append("email", email);
      form.append("country_code", selectedCountry.dial);
      form.append("phone", phone);
      form.append("store_name", storeName);
      form.append("business_category", businessCategory);
      form.append("terms_accepted", termsAccepted ? "1" : "0");

      if (beveragesLicenseFile)
        form.append("beverages_retail_license", beveragesLicenseFile);
      if (businessRegFile)
        form.append("business_registration_license", businessRegFile);
      if (ownerIdFiles && ownerIdFiles.length)
        ownerIdFiles.forEach((f) => form.append("owner_id_files", f));
      if (addressProofFile)
        form.append("store_address_proof", addressProofFile);
      if (storePhotos && storePhotos.length)
        storePhotos.forEach((f) => form.append("store_photos", f));

      await sendPartnerMessage(form);
      setSubmitSuccess("Application submitted — we will contact you soon.");
      // optionally clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setStoreName("");
      setBusinessCategory("");
      setbeveragesLicenseFile(null);
      setBusinessRegFile(null);
      setOwnerIdFiles(null);
      setAddressProofFile(null);
      setStorePhotos(null);
      // clear file input DOM values so the inputs appear empty
      if (beveragesRef.current) beveragesRef.current.value = "";
      if (businessRegRef.current) businessRegRef.current.value = "";
      if (ownerIdRef.current) ownerIdRef.current.value = "";
      if (addressProofRef.current) addressProofRef.current.value = "";
      if (storePhotosRef.current) storePhotosRef.current.value = "";
    } catch (err) {
      setSubmitError("Failed to submit. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0 overflow-x-hidden">
      {/* Split Hero Section - Premium Merchant Layout */}
      <section className="relative flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Left Side: Brand Visuals */}
        <div className="relative flex-[1.1] hidden lg:flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-[center_20%] transition-transform duration-[20s] hover:scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1562601579-599dec564e06?auto=format&fit=crop&q=80&w=1600")',
            }}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          <div className="relative z-10 p-16 xl:p-24 max-w-2xl animate-fade-in-up">
            <h1 className="text-white text-5xl xl:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Partner with the <br />
              <span className="text-[#E23744]">#1 beverages app</span>
            </h1>
            <p className="text-white/90 text-xl xl:text-2xl leading-relaxed font-medium max-w-lg">
              Reach millions of customers and grow your retail business with
              Bhukk's smart delivery network.
            </p>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 15}`}
                      alt="Merchant"
                    />
                  </div>
                ))}
              </div>
              <div className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
                Trusted by 5,000+ Stores
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Enrollment Form */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 pt-28 lg:pt-16">
          <div className="w-full max-w-[440px] space-y-8 animate-fade-in-up">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-[#1C1C1C] tracking-tight">
                Get started
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  Email <Info size={12} className="text-gray-300" />
                </label>
                <input
                  type="email"
                  placeholder="jane@beveragesshop.com"
                  className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Store Phone Number
                </label>
                <div className="flex gap-2 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className="bg-[#F6F6F6] rounded-xl px-4 py-3 flex items-center gap-2 text-sm border-r border-gray-200 hover:bg-[#EFEFEF] transition-colors min-w-[100px] justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedCountry.flag}
                        className="w-5"
                        alt={selectedCountry.code}
                      />
                      <span className="font-bold">{selectedCountry.dial}</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full max-w-[240px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsCountryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${selectedCountry.code === c.code ? "bg-[#FFF1F2] text-[#E23744]" : "text-gray-700"}`}
                        >
                          <img src={c.flag} className="w-5" alt={c.code} />
                          <span className="font-bold min-w-[40px]">
                            {c.dial}
                          </span>
                          <span className="truncate">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <input
                    type="tel"
                    placeholder="9876543210"
                    className="flex-1 bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Store Name
                </label>
                <input
                  type="text"
                  placeholder="Vintage Spirits Boutique"
                  className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Business Type
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium appearance-none"
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                  >
                    <option value="">Select Business Category</option>
                    <option>Retail beverages Store</option>
                    <option>Wine & Beer Shop</option>
                    <option>Authorized Distributor</option>
                    <option>Grocery</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all"></div>
                    <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                    I agree to Bhukk's Store Terms and acknowledge the{" "}
                    <a href="#" className="text-[#E23744] hover:underline">
                      Privacy Notice
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Document Uploads */}
              <div className="pt-2 space-y-4">
                <h4 className="text-sm font-bold text-[#1C1C1C]">
                  Required Documents
                </h4>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    beverages Retail License
                  </label>
                  <input
                    ref={beveragesRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full"
                    onChange={(e) =>
                      setbeveragesLicenseFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Business Registration
                  </label>
                  <input
                    ref={businessRegRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full"
                    onChange={(e) =>
                      setBusinessRegFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Owner ID & PAN (upload)
                    </label>
                    <input
                      ref={ownerIdRef}
                      type="file"
                      accept="application/pdf,image/*"
                      multiple
                      className="w-full"
                      onChange={(e) =>
                        setOwnerIdFiles(
                          e.target.files ? Array.from(e.target.files) : null,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Store Address Proof
                    </label>
                    <input
                      ref={addressProofRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full"
                      onChange={(e) =>
                        setAddressProofFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Store Photos
                  </label>
                  <input
                    ref={storePhotosRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full"
                    onChange={(e) =>
                      setStorePhotos(
                        e.target.files ? Array.from(e.target.files) : null,
                      )
                    }
                  />
                </div>
              </div>
              {submitError && (
                <div className="text-sm text-red-500">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="text-sm text-green-600">{submitSuccess}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold text-base hover:bg-black transition-all shadow-lg active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit & Start Selling"}{" "}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* local handlers */}

      {/* B2B Partner Overview (inserted) */}
      <B2BSection showHero={false} />

      {/* Why Bhukk Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-4xl font-black text-[#1C1C1C] mb-16 tracking-tight">
            Why Bhukk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                icon: <Users size={44} strokeWidth={1.5} />,
                title: "Access new customers",
                desc: "Get discovered by people actively searching for food, spirits, and retail items in your neighborhood.",
              },
              {
                icon: <Truck size={44} strokeWidth={1.5} />,
                title: "Seamless delivery network",
                desc: "Leverage Bhukk's extensive network of couriers for fast and reliable order fulfillment at scale.",
              },
              {
                icon: <Briefcase size={44} strokeWidth={1.5} />,
                title: "Flexible choices",
                desc: "Offer on-demand delivery, pickup, and scheduled orders tailored to your store operations.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="space-y-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-[#1C1C1C] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#1C1C1C] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[#696969] text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-Impact Visual Section */}
      <section className="relative py-32 bg-[#F8F8F8] overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-[#1C1C1C] leading-[1.1] tracking-tight">
                Ready to take your store{" "}
                <span className="text-[#E23744]">digital?</span>
              </h2>
              <p className="text-[#696969] text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join the platform that is redefining how India discovers and
                orders premium beverages legally and responsibly.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button className="bg-[#1C1C1C] text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all shadow-xl flex items-center gap-2">
                  Get Started <ChevronRight size={20} />
                </button>
                <button className="bg-white text-[#1C1C1C] border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                  Contact Support
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img
                  src="/assets/dashboard.png"
                  alt="Store Management"
                  className="w-full h-[450px] object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
                      LIVE DASHBOARD
                    </span>
                  </div>
                  <h4 className="text-white text-2xl font-bold">
                    Manage everything on the go
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddStore;
