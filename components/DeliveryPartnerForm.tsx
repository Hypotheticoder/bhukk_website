import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Upload, Bike } from "lucide-react";
import { sendDeliveryPartnerMessage } from "@/api/services/deliverypartner.service";
import TermsConditionsModal from "./TermsConditionsModal";

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const DeliveryPartnerForm: React.FC = () => {
  // Personal details
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [altPhoneNo, setAltPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  // ID Proof
  const [idProofType, setIdProofType] = useState("");

  // Address
  const [addressLine, setAddressLine] = useState("");

  // Vehicle
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // Driving license
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");

  // Servicing zones
  const [servicingZones, setServicingZones] = useState("");

  // Toggles
  const [chaknaEnabled, setChaknaEnabled] = useState(false);
  const [foodTradeLicenseAvailable, setFoodTradeLicenseAvailable] =
    useState(false);
  const [fssaiNumber, setFssaiNumber] = useState("");

  // Bank
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [upiId, setUpiId] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  // File fields
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [vehicleRcFile, setVehicleRcFile] = useState<File | null>(null);
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(
    null,
  );
  const [cancelledChequeFile, setCancelledChequeFile] = useState<File | null>(
    null,
  );

  // Refs for resetting file inputs
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const idProofRef = useRef<HTMLInputElement>(null);
  const vehicleRcRef = useRef<HTMLInputElement>(null);
  const drivingLicenseRef = useRef<HTMLInputElement>(null);
  const cancelledChequeRef = useRef<HTMLInputElement>(null);

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

      // Required text
      form.append("full_name", fullName);
      form.append("email", email);
      form.append("phone_no", phoneNo);
      form.append("password", password);

      // Optional text
      if (dateOfBirth) form.append("date_of_birth", dateOfBirth);
      if (gender) form.append("gender", gender);
      if (altPhoneNo) form.append("alt_phone_no", altPhoneNo);
      if (idProofType) form.append("id_proof_type", idProofType);
      if (addressLine) form.append("address_line", addressLine);
      if (vehicleType) form.append("vehicle_type", vehicleType);
      if (vehicleModel) form.append("vehicle_model", vehicleModel);
      if (vehicleNumber) form.append("vehicle_number", vehicleNumber);
      if (drivingLicenseNumber)
        form.append("driving_license_number", drivingLicenseNumber);
      if (servicingZones) form.append("servicing_zones", servicingZones);
      form.append("chakna_enabled", chaknaEnabled ? "true" : "false");
      form.append(
        "food_trade_license_available",
        foodTradeLicenseAvailable ? "true" : "false",
      );
      if (fssaiNumber) form.append("fssai_number", fssaiNumber);
      if (bankAccountName) form.append("bank_account_name", bankAccountName);
      if (bankName) form.append("bank_name", bankName);
      if (accountNumber) form.append("account_number", accountNumber);
      if (ifscCode) form.append("ifsc_code", ifscCode);
      if (upiId) form.append("upi_id", upiId);

      // Files — send as UploadFile on the "*_url" keys the backend expects
      if (profilePhotoFile) form.append("profile_photo_url", profilePhotoFile);
      if (idProofFile) form.append("id_proof_url", idProofFile);
      if (vehicleRcFile) form.append("vehicle_rc_url", vehicleRcFile);
      if (drivingLicenseFile)
        form.append("driving_license_url", drivingLicenseFile);
      if (cancelledChequeFile)
        form.append("cancelled_cheque_url", cancelledChequeFile);

      await sendDeliveryPartnerMessage(form);
      setSubmitSuccess(
        "Application submitted! Our team will contact you soon.",
      );

      // Reset text
      setFullName("");
      setDateOfBirth("");
      setGender("");
      setEmail("");
      setPhoneNo("");
      setAltPhoneNo("");
      setPassword("");
      setIdProofType("");
      setAddressLine("");
      setVehicleType("");
      setVehicleModel("");
      setVehicleNumber("");
      setDrivingLicenseNumber("");
      setServicingZones("");
      setChaknaEnabled(false);
      setFoodTradeLicenseAvailable(false);
      setFssaiNumber("");
      setBankAccountName("");
      setBankName("");
      setAccountNumber("");
      setIfscCode("");
      setUpiId("");

      // Reset files
      setProfilePhotoFile(null);
      setIdProofFile(null);
      setVehicleRcFile(null);
      setDrivingLicenseFile(null);
      setCancelledChequeFile(null);

      [
        profilePhotoRef,
        idProofRef,
        vehicleRcRef,
        drivingLicenseRef,
        cancelledChequeRef,
      ].forEach((r) => {
        if (r.current) r.current.value = "";
      });
    } catch (err: any) {
      console.error("Delivery partner submit error", err);
      // Prefer server-provided message when available
      const serverMsg =
        err?.response?.data?.detail || err?.response?.data || err?.message;
      setSubmitError(
        typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0 overflow-x-hidden">
      <section className="relative flex flex-col lg:flex-row min-h-screen bg-white">
        {/* Left Hero Panel */}
        <div className="relative flex-[1.1] hidden lg:flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1600")',
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
              <Bike size={16} className="text-[#E23744]" />
              Delivery Partner
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
              Deliver &amp; <br />
              <span className="text-[#E23744]">Earn With Bhukk</span>
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-lg">
              Join as a delivery partner. Enjoy flexible hours, instant payouts,
              and grow your earnings every day.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Flexible working hours",
                "Weekly fast settlements",
                "In-app safety & support",
                "No paperwork at pickup",
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

        {/* Right Form Panel */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 pt-28 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[500px] space-y-8"
          >
            <div>
              <h2 className="text-3xl font-black text-[#1C1C1C] tracking-tight">
                Partner Registration
              </h2>
              <p className="text-[#696969] mt-2 text-sm">
                Fill in your details and our team will contact you within 48
                hours.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* === PERSONAL DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Personal Details
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    placeholder="John Doe"
                    value={fullName}
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Gender
                    </label>
                    <select
                      className={inputClass + " appearance-none"}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="john@example.com"
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
                      value={phoneNo}
                      required
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Alt Phone
                    </label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="Optional"
                      value={altPhoneNo}
                      onChange={(e) => setAltPhoneNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="Create a strong password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Profile Photo
                  </label>
                  <input
                    ref={profilePhotoRef}
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setProfilePhotoFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === ID PROOF === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  ID Proof
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    ID Proof Type
                  </label>
                  <select
                    className={inputClass + " appearance-none"}
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Aadhaar">Aadhaar</option>
                    <option value="PAN">PAN</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> ID Proof Document
                  </label>
                  <input
                    ref={idProofRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setIdProofFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === ADDRESS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Address
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Address Line
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Full Address"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                  />
                </div>
              </div>

              {/* === VEHICLE DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Vehicle Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Vehicle Type
                    </label>
                    <select
                      className={inputClass + " appearance-none"}
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Two-Wheeler">Two-Wheeler</option>
                      <option value="Three-Wheeler">Three-Wheeler</option>
                      <option value="Four-Wheeler">Four-Wheeler</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Vehicle Model
                    </label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Honda Activa 6G"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Vehicle Number
                  </label>
                  <input
                    className={inputClass}
                    placeholder="WB26A1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Vehicle RC
                  </label>
                  <input
                    ref={vehicleRcRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setVehicleRcFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === DRIVING LICENSE === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Driving License
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    License Number
                  </label>
                  <input
                    className={inputClass}
                    placeholder="WB-123456789"
                    value={drivingLicenseNumber}
                    onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> License Document
                  </label>
                  <input
                    ref={drivingLicenseRef}
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    onChange={(e) =>
                      setDrivingLicenseFile(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>

              {/* === SERVICING ZONES === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Servicing Zones
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Preferred Zones
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. South Kolkata, Salt Lake"
                    value={servicingZones}
                    onChange={(e) => setServicingZones(e.target.value)}
                  />
                </div>
              </div>

              {/* === FOOD TRADE / FSSAI === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Additional Info
                </h3>

                <div className="pt-1 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={chaknaEnabled}
                        onChange={(e) => setChaknaEnabled(e.target.checked)}
                      />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                      <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Chakna Delivery Enabled
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={foodTradeLicenseAvailable}
                        onChange={(e) =>
                          setFoodTradeLicenseAvailable(e.target.checked)
                        }
                      />
                      <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                      <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Food Trade License Available
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    FSSAI Number
                  </label>
                  <input
                    className={inputClass}
                    placeholder="Optional"
                    value={fssaiNumber}
                    onChange={(e) => setFssaiNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* === BANK DETAILS === */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#981A1E] uppercase tracking-widest border-b pb-2">
                  Bank Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Account Holder Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="John Doe"
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Bank Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="HDFC Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Account Number
                    </label>
                    <input
                      className={inputClass}
                      placeholder="50123456789"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      IFSC Code
                    </label>
                    <input
                      className={inputClass}
                      placeholder="HDFC0000123"
                      value={ifscCode}
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
                      placeholder="you@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Cancelled Cheque
                    </label>
                    <input
                      ref={cancelledChequeRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      onChange={(e) =>
                        setCancelledChequeFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* === TERMS === */}
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
                    I verify that all submitted information is genuine. I agree
                    to Bhukk's Delivery Partner{" "}
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

export default DeliveryPartnerForm;
