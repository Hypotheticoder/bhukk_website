import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Info,
  Upload,
  Factory,
} from "lucide-react";
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

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const ManufacturerForm: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [annualCapacity, setAnnualCapacity] = useState("");
  const [plantLocation, setPlantLocation] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [manufacturingLicense, setManufacturingLicense] = useState<File | null>(
    null,
  );
  const [businessRegFile, setBusinessRegFile] = useState<File | null>(null);
  const [ownerIdFiles, setOwnerIdFiles] = useState<File[] | null>(null);
  const [fssaiCertificate, setFssaiCertificate] = useState<File | null>(null);
  const [productCatalog, setProductCatalog] = useState<File[] | null>(null);

  const manufacturingLicenseRef = useRef<HTMLInputElement>(null);
  const businessRegRef = useRef<HTMLInputElement>(null);
  const ownerIdRef = useRef<HTMLInputElement>(null);
  const fssaiRef = useRef<HTMLInputElement>(null);
  const catalogRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsCountryOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);
    if (!termsAccepted) {
      setSubmitError("You must accept the terms.");
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
      form.append("store_name", companyName);
      form.append("business_category", "Beverages Manufacturer");
      form.append("terms_accepted", termsAccepted ? "1" : "0");

      if (manufacturingLicense)
        form.append("beverages_retail_license", manufacturingLicense);
      if (businessRegFile)
        form.append("business_registration_license", businessRegFile);
      if (ownerIdFiles?.length)
        ownerIdFiles.forEach((f) => form.append("owner_id_files", f));
      if (fssaiCertificate)
        form.append("store_address_proof", fssaiCertificate);
      if (productCatalog?.length)
        productCatalog.forEach((f) => form.append("store_photos", f));

      await sendPartnerMessage(form);
      setSubmitSuccess(
        "Application submitted! Our team will contact you soon.",
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompanyName("");
      setProductCategory("");
      setAnnualCapacity("");
      setPlantLocation("");
      setManufacturingLicense(null);
      setBusinessRegFile(null);
      setOwnerIdFiles(null);
      setFssaiCertificate(null);
      setProductCatalog(null);
      [
        manufacturingLicenseRef,
        businessRegRef,
        ownerIdRef,
        fssaiRef,
        catalogRef,
      ].forEach((r) => {
        if (r.current) r.current.value = "";
      });
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0 overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex flex-col lg:flex-row min-h-screen bg-white">
        <div className="relative flex-[1.1] hidden lg:flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600")',
            }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-16 xl:p-24 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              <Factory size={16} className="text-[#E23744]" />
              Manufacturer Partner
            </div>
            <h1 className="text-white text-5xl xl:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Scale Your <br />
              <span className="text-[#E23744]">Production Reach</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-lg">
              Connect directly with hundreds of distributors and retailers
              across India. Let Bhukk power your go-to-market.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Direct-to-retailer channels",
                "Demand analytics by region",
                "Brand visibility to end consumers",
                "Compliance-first onboarding",
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-white/70 text-sm font-medium"
                >
                  <CheckCircle size={16} className="text-[#E23744]" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 pt-28 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[460px] space-y-8"
          >
            <div>
              <h2 className="text-3xl font-black text-[#1C1C1C] tracking-tight">
                Manufacturer Application
              </h2>
              <p className="text-[#696969] mt-2 text-sm">
                Tell us about your manufacturing setup and our team will connect
                within 48 hours.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    First Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Amit"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Last Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Gupta"
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
                  className={inputClass}
                  placeholder="amit@brewery.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <div className="flex gap-2 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
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
                      className={`transition-transform duration-200 ${isCountryOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isCountryOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full max-w-[240px] bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden">
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsCountryOpen(false);
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
                    className={"flex-1 " + inputClass}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Company / Brand Name
                </label>
                <input
                  className={inputClass}
                  placeholder="Royal Beverages India Pvt Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Product Category
                  </label>
                  <div className="relative">
                    <select
                      className={inputClass + " appearance-none"}
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      <option>Beer & Cider</option>
                      <option>Spirits & Liquor</option>
                      <option>Wine</option>
                      <option>Ready-to-Drink</option>
                      <option>Non-Alcoholic Beverages</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Annual Capacity
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. 5,00,000 cases"
                    value={annualCapacity}
                    onChange={(e) => setAnnualCapacity(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Manufacturing Plant Location
                </label>
                <input
                  className={inputClass}
                  placeholder="Nashik, Maharashtra"
                  value={plantLocation}
                  onChange={(e) => setPlantLocation(e.target.value)}
                />
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
                    <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                    <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                    I agree to Bhukk's Partner Terms and acknowledge the{" "}
                    <a href="#" className="text-[#E23744] hover:underline">
                      Privacy Notice
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Document Uploads */}
              <div className="pt-2 space-y-4">
                <h4 className="text-sm font-bold text-[#1C1C1C] flex items-center gap-2">
                  <Upload size={14} /> Required Documents
                </h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Manufacturing License
                  </label>
                  <input
                    ref={manufacturingLicenseRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setManufacturingLicense(e.target.files?.[0] ?? null)
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
                    className="w-full text-sm"
                    onChange={(e) =>
                      setBusinessRegFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Owner ID & PAN
                    </label>
                    <input
                      ref={ownerIdRef}
                      type="file"
                      accept="application/pdf,image/*"
                      multiple
                      className="w-full text-sm"
                      onChange={(e) =>
                        setOwnerIdFiles(
                          e.target.files ? Array.from(e.target.files) : null,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      FSSAI Certificate
                    </label>
                    <input
                      ref={fssaiRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      onChange={(e) =>
                        setFssaiCertificate(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Product Catalog / Photos
                  </label>
                  <input
                    ref={catalogRef}
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    className="w-full text-sm"
                    onChange={(e) =>
                      setProductCatalog(
                        e.target.files ? Array.from(e.target.files) : null,
                      )
                    }
                  />
                </div>
              </div>

              {submitError && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-xl">
                  {submitSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold text-base hover:bg-black transition-all shadow-lg active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
                <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManufacturerForm;
