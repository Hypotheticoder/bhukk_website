import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Upload,
  Building2,
} from "lucide-react";
import { sendDistributorMessage } from "@/api/services/distributor.service";

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const DistributorForm: React.FC = () => {
  // Text Fields
  const [tradeName, setTradeName] = useState("");
  const [businessType, setBusinessType] = useState("");
  
  const [gstNo, setGstNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [tanNo, setTanNo] = useState("");
  
  const [msmeRegistered, setMsmeRegistered] = useState(false);
  
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  
  const [warehouseLicenseNo, setWarehouseLicenseNo] = useState("");
  const [exciseLicenseNo, setExciseLicenseNo] = useState("");
  const [licenseValidFrom, setLicenseValidFrom] = useState("");
  const [licenseValidUpto, setLicenseValidUpto] = useState("");
  
  const [bankAcName, setBankAcName] = useState("");
  const [bankAcNo, setBankAcNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankBranchName, setBankBranchName] = useState("");
  const [upiId, setUpiId] = useState("");
  
  const [deliveryFleetSize, setDeliveryFleetSize] = useState("");
  const [servicingArea, setServicingArea] = useState("");
  const [vehicleCount, setVehicleCount] = useState("");
  
  const [contactPersonName, setContactPersonName] = useState("");
  const [phnNo, setPhnNo] = useState("");
  const [altPhnNo, setAltPhnNo] = useState("");
  const [email, setEmail] = useState("");
  
  const [termsAccepted, setTermsAccepted] = useState(true);

  // File Fields
  const [gstCertificateFile, setGstCertificateFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [msmeCertificateFile, setMsmeCertificateFile] = useState<File | null>(null);
  const [firesafetyCertificateFile, setFiresafetyCertificateFile] = useState<File | null>(null);
  const [exciseLicenseFile, setExciseLicenseFile] = useState<File | null>(null);
  const [companyIncorporationCertificateFile, setCompanyIncorporationCertificateFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [cancelledChequeFile, setCancelledChequeFile] = useState<File | null>(null);
  const [transporationLogisticsFile, setTransporationLogisticsFile] = useState<File | null>(null);

  // Refs for resetting file inputs
  const gstCertRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);
  const msmeCertRef = useRef<HTMLInputElement>(null);
  const fireNocRef = useRef<HTMLInputElement>(null);
  const exciseRef = useRef<HTMLInputElement>(null);
  const companyIncRef = useRef<HTMLInputElement>(null);
  const tradeRef = useRef<HTMLInputElement>(null);
  const chequeRef = useRef<HTMLInputElement>(null);
  const logisticsRef = useRef<HTMLInputElement>(null);

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
      form.append("trade_name", tradeName);
      form.append("registered_address", registeredAddress);
      form.append("bank_ac_name", bankAcName);
      form.append("bank_ac_no", bankAcNo);
      form.append("ifsc_code", ifscCode);
      form.append("phn_no", phnNo);
      form.append("email", email);

      // Optional Text
      if (businessType) form.append("business_type", businessType);
      if (gstNo) form.append("gst_no", gstNo);
      if (panNo) form.append("pan_no", panNo);
      if (tanNo) form.append("tan_no", tanNo);
      form.append("msme_registered", msmeRegistered ? "true" : "false");
      if (warehouseAddress) form.append("warehouse_address", warehouseAddress);
      if (warehouseLicenseNo) form.append("warehouse_license_no", warehouseLicenseNo);
      if (exciseLicenseNo) form.append("excise_license_no", exciseLicenseNo);
      if (licenseValidFrom) form.append("license_valid_from", licenseValidFrom);
      if (licenseValidUpto) form.append("license_valid_upto", licenseValidUpto);
      if (bankBranchName) form.append("bank_branch_name", bankBranchName);
      if (upiId) form.append("upi_id", upiId);
      if (deliveryFleetSize) form.append("delivery_fleet_size", deliveryFleetSize);
      if (servicingArea) form.append("servicing_area", servicingArea);
      if (vehicleCount) form.append("vehicle_count", vehicleCount);
      if (contactPersonName) form.append("contact_person_name", contactPersonName);
      if (altPhnNo) form.append("alt_phn_no", altPhnNo);

      // Files
      if (gstCertificateFile) form.append("gst_certificate_file", gstCertificateFile);
      if (panFile) form.append("pan_file", panFile);
      if (msmeCertificateFile) form.append("msme_certificate_file", msmeCertificateFile);
      if (firesafetyCertificateFile) form.append("firesafety_certificate_file", firesafetyCertificateFile);
      if (exciseLicenseFile) form.append("excise_license_file", exciseLicenseFile);
      if (companyIncorporationCertificateFile) form.append("company_incorporation_certificate_file", companyIncorporationCertificateFile);
      if (tradeLicenseFile) form.append("trade_license_file", tradeLicenseFile);
      if (cancelledChequeFile) form.append("cancelled_cheque_file", cancelledChequeFile);
      if (transporationLogisticsFile) form.append("transporation_logistics_file", transporationLogisticsFile);

      await sendDistributorMessage(form);
      setSubmitSuccess(
        "Application submitted! Our team will contact you soon.",
      );

      // Reset text
      setTradeName("");
      setBusinessType("");
      setGstNo("");
      setPanNo("");
      setTanNo("");
      setMsmeRegistered(false);
      setRegisteredAddress("");
      setWarehouseAddress("");
      setWarehouseLicenseNo("");
      setExciseLicenseNo("");
      setLicenseValidFrom("");
      setLicenseValidUpto("");
      setBankAcName("");
      setBankAcNo("");
      setIfscCode("");
      setBankBranchName("");
      setUpiId("");
      setDeliveryFleetSize("");
      setServicingArea("");
      setVehicleCount("");
      setContactPersonName("");
      setPhnNo("");
      setAltPhnNo("");
      setEmail("");

      // Reset files
      setGstCertificateFile(null);
      setPanFile(null);
      setMsmeCertificateFile(null);
      setFiresafetyCertificateFile(null);
      setExciseLicenseFile(null);
      setCompanyIncorporationCertificateFile(null);
      setTradeLicenseFile(null);
      setCancelledChequeFile(null);
      setTransporationLogisticsFile(null);

      [
        gstCertRef,
        panRef,
        msmeCertRef,
        fireNocRef,
        exciseRef,
        companyIncRef,
        tradeRef,
        chequeRef,
        logisticsRef,
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
                'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600")',
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
              <Building2 size={16} className="text-[#E23744]" />
              Distributor Partner
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
              Expand Your <br />
              <span className="text-[#E23744]">Distribution Network</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-lg">
              Join Bhukk as a licensed distributor. Reach verified retailers,
              unlock new markets, and grow your business digitally.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Direct access to verified retailers",
                "Real-time demand data by zone",
                "Fast, transparent settlements",
                "Dedicated account manager",
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
                Distributor Application
              </h2>
              <p className="text-[#696969] mt-2 text-sm">
                Fill in your details and our partnerships team will reach out
                within 48 hours.
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
                    Trade Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="ABC Beverages Distibutors Pvt Ltd"
                    value={tradeName}
                    required
                    onChange={(e) => setTradeName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Business Type
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Private Limited, Partnership"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Company Incorporation Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={companyIncRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) => setCompanyIncorporationCertificateFile(e.target.files?.[0] ?? null)}
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
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> PAN Upload <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={panRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-xs"
                      required
                      onChange={(e) => setPanFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> GST Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={gstCertRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-xs"
                      required
                      onChange={(e) => setGstCertificateFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    TAN No
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Optional TAN No"
                    value={tanNo}
                    onChange={(e) => setTanNo(e.target.value)}
                  />
                </div>
              </div>

              {/* === MSME DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  MSME Details
                </h3>

                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={msmeRegistered}
                        onChange={(e) => setMsmeRegistered(e.target.checked)}
                      />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                      <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                      Are you MSME Registered?
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> MSME Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={msmeCertRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) => setMsmeCertificateFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </div>

              {/* === ADDRESS DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Address Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Registered Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Full Registered Office Address"
                    value={registeredAddress}
                    required
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Warehouse Address
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Warehouse / Godown Address"
                    value={warehouseAddress}
                    onChange={(e) => setWarehouseAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* === WAREHOUSE AND LICENSE DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Warehouse & License Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Warehouse License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="Optional"
                      value={warehouseLicenseNo}
                      onChange={(e) => setWarehouseLicenseNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Excise License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="FL-XYZ"
                      value={exciseLicenseNo}
                      onChange={(e) => setExciseLicenseNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      License Valid From
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={licenseValidFrom}
                      onChange={(e) => setLicenseValidFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      License Valid Upto
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={licenseValidUpto}
                      onChange={(e) => setLicenseValidUpto(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Excise License Document <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={exciseRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) => setExciseLicenseFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Trade License <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={tradeRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) => setTradeLicenseFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Fire Safety Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={fireNocRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      required
                      onChange={(e) => setFiresafetyCertificateFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
              </div>


              {/* === FLEET & LOGISTICS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Fleet & Logistics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Delivery Fleet Size
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="e.g. 15"
                      value={deliveryFleetSize}
                      onChange={(e) => setDeliveryFleetSize(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Vehicle Count
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="e.g. 5"
                      value={vehicleCount}
                      onChange={(e) => setVehicleCount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Servicing Area
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. ['Mumbai', 'Pune', 'Nashik'] or comma separated"
                    value={servicingArea}
                    onChange={(e) => setServicingArea(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Logistics & Transport Details <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={logisticsRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) => setTransporationLogisticsFile(e.target.files?.[0] ?? null)}
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
                    Bank Account Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Account Name"
                    value={bankAcName}
                    required
                    onChange={(e) => setBankAcName(e.target.value)}
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
                      placeholder="business@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Cancelled Cheque <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={chequeRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    required
                    onChange={(e) => setCancelledChequeFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              </div>


              {/* === CONTACT DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Contact Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Contact Person Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Jane Doe"
                    value={contactPersonName}
                    onChange={(e) => setContactPersonName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    Email Address <span className="text-red-500">*</span> <Info size={12} className="text-gray-300" />
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
                    I verify that all submitted documents and information are genuine. I agree to Bhukk's Distributor Terms.
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

export default DistributorForm;
