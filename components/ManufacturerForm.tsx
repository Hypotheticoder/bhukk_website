import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TermsConditionsModal from "./TermsConditionsModal";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Info,
  Upload,
  Factory,
} from "lucide-react";
import { sendManufacturerMessage } from "@/api/services/manufacturer.service";

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const ManufacturerForm: React.FC = () => {
  // Text Fields
  const [companyName, setCompanyName] = useState("");
  const [panNo, setPanNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [registeredOfficeAddress, setRegisteredOfficeAddress] = useState("");
  const [factoryAddress, setFactoryAddress] = useState("");
  const [exciseNo, setExciseNo] = useState("");
  const [fssaiLicenseNo, setFssaiLicenseNo] = useState("");
  const [authSignatoryName, setAuthSignatoryName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcNo, setBankAcNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [email, setEmail] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [altPhnNo, setAltPhnNo] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  // File Fields
  const [incorporationCertificate, setIncorporationCertificate] =
    useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [gstCertFile, setGstCertFile] = useState<File | null>(null);
  const [exciseLicenseFile, setExciseLicenseFile] = useState<File | null>(null);
  const [fssaiLicenseFile, setFssaiLicenseFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [authLetterFile, setAuthLetterFile] = useState<File | null>(null);
  const [cancelledChequeFile, setCancelledChequeFile] = useState<File | null>(
    null,
  );
  const [manufacturerImages, setManufacturerImages] = useState<File[] | null>(
    null,
  );

  // Refs for resetting file inputs
  const incCertRef = useRef<HTMLInputElement>(null);
  const panFileRef = useRef<HTMLInputElement>(null);
  const gstCertRef = useRef<HTMLInputElement>(null);
  const exciseRef = useRef<HTMLInputElement>(null);
  const fssaiRef = useRef<HTMLInputElement>(null);
  const tradeRef = useRef<HTMLInputElement>(null);
  const authLetterRef = useRef<HTMLInputElement>(null);
  const chequeRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

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

      // Required Text
      form.append("company_name", companyName);
      form.append("registered_office_address", registeredOfficeAddress);
      form.append("bank_name", bankName);
      form.append("bank_ac_no", bankAcNo);
      form.append("ifsc_code", ifscCode);
      form.append("email", email);
      form.append("phn_no", phnNo);

      // Optional Text
      if (panNo) form.append("pan_no", panNo);
      if (gstNo) form.append("gst_no", gstNo);
      if (factoryAddress) form.append("factory_address", factoryAddress);
      if (exciseNo) form.append("excise_no", exciseNo);
      if (fssaiLicenseNo) form.append("fssai_license_no", fssaiLicenseNo);
      if (authSignatoryName)
        form.append("auth_signatory_name", authSignatoryName);
      if (upiId) form.append("upi_id", upiId);
      if (altPhnNo) form.append("alt_phn_no", altPhnNo);

      // Files
      if (incorporationCertificate)
        form.append("incorporation_certificate", incorporationCertificate);
      if (panFile) form.append("pan_file", panFile);
      if (gstCertFile) form.append("gst_cert_file", gstCertFile);
      if (exciseLicenseFile)
        form.append("excise_license_file", exciseLicenseFile);
      if (fssaiLicenseFile) form.append("fssai_license_file", fssaiLicenseFile);
      if (tradeLicenseFile) form.append("trade_license_file", tradeLicenseFile);
      if (authLetterFile) form.append("auth_letter_file", authLetterFile);
      if (cancelledChequeFile)
        form.append("cancelled_cheque_file", cancelledChequeFile);
      if (manufacturerImages?.length) {
        manufacturerImages.forEach((f) =>
          form.append("manufacturer_images", f),
        );
      }

      // Also send UploadFile objects for backend-required "*_url" fields
      if (incorporationCertificate)
        form.append("incorporation_certificate_url", incorporationCertificate);
      if (panFile) form.append("pan_url", panFile);
      if (gstCertFile) form.append("gst_cert_url", gstCertFile);
      if (exciseLicenseFile)
        form.append("excise_license_url", exciseLicenseFile);
      if (fssaiLicenseFile) form.append("fssai_license_url", fssaiLicenseFile);
      if (tradeLicenseFile) form.append("trade_license_url", tradeLicenseFile);
      if (authLetterFile) form.append("auth_letter_url", authLetterFile);
      if (cancelledChequeFile)
        form.append("cancelled_cheque_url", cancelledChequeFile);
      if (manufacturerImages?.length) {
        manufacturerImages.forEach((f) =>
          form.append("manufacturer_images_url", f),
        );
      }

      await sendManufacturerMessage(form);
      setSubmitSuccess(
        "Application submitted! Our team will contact you soon.",
      );

      // Reset text
      setCompanyName("");
      setPanNo("");
      setGstNo("");
      setRegisteredOfficeAddress("");
      setFactoryAddress("");
      setExciseNo("");
      setFssaiLicenseNo("");
      setAuthSignatoryName("");
      setBankName("");
      setBankAcNo("");
      setIfscCode("");
      setUpiId("");
      setEmail("");
      setPhnNo("");
      setAltPhnNo("");

      // Reset files
      setIncorporationCertificate(null);
      setPanFile(null);
      setGstCertFile(null);
      setExciseLicenseFile(null);
      setFssaiLicenseFile(null);
      setTradeLicenseFile(null);
      setAuthLetterFile(null);
      setCancelledChequeFile(null);
      setManufacturerImages(null);

      [
        incCertRef,
        panFileRef,
        gstCertRef,
        exciseRef,
        fssaiRef,
        tradeRef,
        authLetterRef,
        chequeRef,
        imagesRef,
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
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6 hover:bg-white/20 transition-colors ml-4"
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>
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

        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 pt-28 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[500px] space-y-8"
          >
            <div>
              <h2 className="text-3xl font-black text-[#1C1C1C] tracking-tight">
                Manufacturer Application
              </h2>
              <p className="text-[#696969] mt-2 text-sm">
                Complete your company profile and compliance info below.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* === COMPANY DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Company Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="M/S Royal Beverages Pvt Ltd"
                    value={companyName}
                    required
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Incorporation Certificate{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={incCertRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setIncorporationCertificate(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === TAX DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Tax Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      PAN No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="ABCDE1234F"
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      GST No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="27ABCDE1234F1Z5"
                      value={gstNo}
                      onChange={(e) => setGstNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      PAN Document <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={panFileRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) => setPanFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      GST Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={gstCertRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) =>
                        setGstCertFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* === ADDRESS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Address Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Registered Office Address{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Full Address"
                    value={registeredOfficeAddress}
                    required
                    onChange={(e) => setRegisteredOfficeAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Factory Address
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Manufacturing Unit Address"
                    value={factoryAddress}
                    onChange={(e) => setFactoryAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* === REGULATORY LICENSES === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Regulatory Approvals
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Excise No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="EXC-123"
                      value={exciseNo}
                      onChange={(e) => setExciseNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      FSSAI License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="1002000000"
                      value={fssaiLicenseNo}
                      onChange={(e) => setFssaiLicenseNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Excise License{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={exciseRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setExciseLicenseFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> FSSAI License{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={fssaiRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setFssaiLicenseFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Trade License{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={tradeRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setTradeLicenseFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === AUTH SIGNATORY === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Authority Signatory
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Signatory Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Full Name of Signatory"
                    value={authSignatoryName}
                    onChange={(e) => setAuthSignatoryName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Auth Letter Document{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={authLetterRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setAuthLetterFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === MEDIA === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Images
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Manufacturer Images{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={imagesRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-sm"
                    required
                    onChange={(e) =>
                      setManufacturerImages(
                        e.target.files ? Array.from(e.target.files) : null,
                      )
                    }
                  />
                </div>
              </div>

              {/* === BANK DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Bank Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="HDFC Bank"
                    value={bankName}
                    required
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Account No <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      placeholder="50123456789"
                      value={bankAcNo}
                      required
                      onChange={(e) => setBankAcNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={inputClass}
                      placeholder="HDFC0000123"
                      value={ifscCode}
                      required
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      UPI ID
                    </label>
                    <input
                      className={inputClass}
                      placeholder="company@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Cancelled Cheque{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={chequeRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) =>
                        setCancelledChequeFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* === CONTACT DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Contact Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="contact@company.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="9876543210"
                      value={phnNo}
                      required
                      onChange={(e) => setPhnNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Alt Phone Number
                    </label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="Optional"
                      value={altPhnNo}
                      onChange={(e) => setAltPhnNo(e.target.value)}
                    />
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
                    <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                    <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                    I verify that all submitted documents and information are
                    genuine. I agree to Bhukk's Manufacturer{" "}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTerms(true);
                      }}
                      className="text-[#E23744] underline hover:text-[#c62833] transition-colors"
                    >
                      Terms &amp; Conditions
                    </button>
                    .
                  </span>
                </label>
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
      <TermsConditionsModal
        open={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </div>
  );
};

export default ManufacturerForm;
