import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Upload,
  Store,
} from "lucide-react";
import { sendRetailerMessage } from "@/api/services/retailer.service";

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const RetailerForm: React.FC = () => {
  // Text Fields
  const [shopName, setShopName] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [exciseLicenseNo, setExciseLicenseNo] = useState("");
  const [licenseIssuingAuthority, setLicenseIssuingAuthority] = useState("");
  const [licenseValidFrom, setLicenseValidFrom] = useState("");
  const [licenseValidUpto, setLicenseValidUpto] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcNo, setBankAcNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankBranchName, setBankBranchName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [email, setEmail] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [altPhn, setAltPhn] = useState("");
  const [authorizedSignatoryName, setAuthorizedSignatoryName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);

  // File Fields
  const [shopPhotoFile, setShopPhotoFile] = useState<File | null>(null);
  const [cancelledChequeFile, setCancelledChequeFile] = useState<File | null>(
    null,
  );
  const [exciseLicenseFile, setExciseLicenseFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [shopEstablishmentLicenseFile, setShopEstablishmentLicenseFile] =
    useState<File | null>(null);
  const [gstCertificateFile, setGstCertificateFile] = useState<File | null>(
    null,
  );
  const [fireNocFile, setFireNocFile] = useState<File | null>(null);

  // Refs for resetting file inputs
  const shopPhotoRef = useRef<HTMLInputElement>(null);
  const chequeRef = useRef<HTMLInputElement>(null);
  const exciseRef = useRef<HTMLInputElement>(null);
  const tradeRef = useRef<HTMLInputElement>(null);
  const shopEstabRef = useRef<HTMLInputElement>(null);
  const gstCertRef = useRef<HTMLInputElement>(null);
  const fireNocRef = useRef<HTMLInputElement>(null);

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
      form.append("shop_name", shopName);
      form.append("license_issuing_authority", licenseIssuingAuthority);
      form.append("license_valid_from", licenseValidFrom);
      form.append("license_valid_upto", licenseValidUpto);
      form.append("registered_address", registeredAddress);
      form.append("bank_name", bankName);
      form.append("bank_ac_no", bankAcNo);
      form.append("ifsc_code", ifscCode);
      form.append("phn_no", phnNo);
      form.append("email", email);

      // Optional Text
      if (licenseType) form.append("license_type", licenseType);
      if (exciseLicenseNo) form.append("excise_license_no", exciseLicenseNo);
      if (gstNo) form.append("gst_no", gstNo);
      if (panNo) form.append("pan_no", panNo);
      if (ownerName) form.append("owner_name", ownerName);
      if (ownershipType) form.append("ownership_type", ownershipType);
      if (openingTime) form.append("opening_time", openingTime);
      if (closingTime) form.append("closing_time", closingTime);
      if (bankBranchName) form.append("bank_branch_name", bankBranchName);
      if (upiId) form.append("upi_id", upiId);
      if (altPhn) form.append("alt_phn", altPhn);
      if (authorizedSignatoryName)
        form.append("authorized_signatory_name", authorizedSignatoryName);

      // Files
      if (cancelledChequeFile)
        form.append("cancelled_cheque_file", cancelledChequeFile);
      if (exciseLicenseFile)
        form.append("excise_license_file", exciseLicenseFile);
      if (tradeLicenseFile) form.append("trade_license_file", tradeLicenseFile);
      if (shopEstablishmentLicenseFile)
        form.append(
          "shop_establishment_license_file",
          shopEstablishmentLicenseFile,
        );
      if (gstCertificateFile)
        form.append("gst_certificate_file", gstCertificateFile);
      if (fireNocFile) form.append("fire_noc_file", fireNocFile);
      if (shopPhotoFile) form.append("shop_photo_file", shopPhotoFile);

      // Backend expects UploadFile for the corresponding "*_url" fields; send file objects
      if (cancelledChequeFile)
        form.append("cancelled_cheque_url", cancelledChequeFile);
      if (exciseLicenseFile)
        form.append("excise_license_url", exciseLicenseFile);
      if (tradeLicenseFile) form.append("trade_license_url", tradeLicenseFile);
      if (shopEstablishmentLicenseFile)
        form.append(
          "shop_establishment_license_url",
          shopEstablishmentLicenseFile,
        );
      if (gstCertificateFile)
        form.append("gst_certificate_url", gstCertificateFile);
      if (fireNocFile) form.append("fire_noc_url", fireNocFile);
      if (shopPhotoFile) form.append("shop_photo_url", shopPhotoFile);

      await sendRetailerMessage(form);
      setSubmitSuccess(
        "Application submitted! Our team will contact you soon.",
      );

      // Reset text
      setShopName("");
      setLicenseType("");
      setExciseLicenseNo("");
      setLicenseIssuingAuthority("");
      setLicenseValidFrom("");
      setLicenseValidUpto("");
      setGstNo("");
      setPanNo("");
      setOwnerName("");
      setOwnershipType("");
      setRegisteredAddress("");
      setOpeningTime("");
      setClosingTime("");
      setBankName("");
      setBankAcNo("");
      setIfscCode("");
      setBankBranchName("");
      setUpiId("");
      setEmail("");
      setPhnNo("");
      setAltPhn("");
      setAuthorizedSignatoryName("");

      // Reset files
      setShopPhotoFile(null);
      setCancelledChequeFile(null);
      setExciseLicenseFile(null);
      setTradeLicenseFile(null);
      setShopEstablishmentLicenseFile(null);
      setGstCertificateFile(null);
      setFireNocFile(null);

      [
        shopPhotoRef,
        chequeRef,
        exciseRef,
        tradeRef,
        shopEstabRef,
        gstCertRef,
        fireNocRef,
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
                'url("https://images.unsplash.com/photo-1562601579-599dec564e06?auto=format&fit=crop&q=80&w=1600")',
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
              <Store size={16} className="text-[#E23744]" />
              Retailer Partner
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
              Grow Your <br />
              <span className="text-[#E23744]">Retail Business</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-lg">
              List your licensed beverages store on Bhukk and start selling to
              thousands of nearby customers — zero tech hassle.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Instant online store presence",
                "Smart inventory & stock control",
                "Real-time order notifications",
                "No delivery management headache",
                "Secure and timely settlements",
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
                Retailer Application
              </h2>
              <p className="text-[#696969] mt-2 text-sm">
                Fill in your store details and our team will contact you within
                48 hours.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* === SHOP DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Shop Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="M/S Royal Wines"
                    value={shopName}
                    required
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Registered Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Full Store Address"
                    value={registeredAddress}
                    required
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      className={inputClass}
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      className={inputClass}
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Shop Photo
                  </label>
                  <input
                    ref={shopPhotoRef}
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setShopPhotoFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === LICENSE DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  License Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      License Type
                    </label>
                    <input
                      className={inputClass}
                      placeholder="e.g. FL-1"
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Excise License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="EXC-12345"
                      value={exciseLicenseNo}
                      onChange={(e) => setExciseLicenseNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Issuing Authority <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="State Excise Department"
                    value={licenseIssuingAuthority}
                    required
                    onChange={(e) => setLicenseIssuingAuthority(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Valid From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={licenseValidFrom}
                      required
                      onChange={(e) => setLicenseValidFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Valid Upto <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={licenseValidUpto}
                      required
                      onChange={(e) => setLicenseValidUpto(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* === OWNER DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Owner Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Owner Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Owner Name"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Ownership Type
                    </label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Proprietorship"
                      value={ownershipType}
                      onChange={(e) => setOwnershipType(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Authorized Signatory Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Signatory Name"
                    value={authorizedSignatoryName}
                    onChange={(e) => setAuthorizedSignatoryName(e.target.value)}
                  />
                </div>
              </div>

              {/* === TAX AND COMPLIANCE === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Tax & Compliance
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
              </div>

              {/* === REQUIRED DOCUMENTS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2 flex items-center gap-2">
                  <Upload size={14} /> Required Documents
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Excise License Document{" "}
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
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Trade License <span className="text-red-500">*</span>
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

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Shop Establishment License{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={shopEstabRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) =>
                        setShopEstablishmentLicenseFile(
                          e.target.files?.[0] ?? null,
                        )
                      }
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
                        setGstCertificateFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Fire NOC <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={fireNocRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) =>
                        setFireNocFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
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
                      Branch Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="MG Road Branch"
                      value={bankBranchName}
                      onChange={(e) => setBankBranchName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      UPI ID
                    </label>
                    <input
                      className={inputClass}
                      placeholder="shop@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
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

              {/* === CONTACT DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Contact Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    Email Address <span className="text-red-500">*</span>{" "}
                    <Info size={12} className="text-gray-300" />
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="contact@shop.com"
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
                      value={altPhn}
                      onChange={(e) => setAltPhn(e.target.value)}
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
                    genuine. I agree to Bhukk's Retailer Terms.
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
    </div>
  );
};

export default RetailerForm;
