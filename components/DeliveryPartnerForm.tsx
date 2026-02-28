import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Upload, Bike } from "lucide-react";
import { sendDeliveryPartnerMessage } from "@/api/services/deliverypartner.service";
import TermsConditionsModal from "./TermsConditionsModal";

const deliveryPartnerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  altPhoneNo: z.string().optional(),
  idProofType: z.string().optional(),
  addressLine: z.string().optional(),
  vehicleType: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleNumber: z.string().optional(),
  drivingLicenseNumber: z.string().optional(),
  servicingZones: z.string().optional(),
  chaknaEnabled: z.boolean().optional(),
  foodTradeLicenseAvailable: z.boolean().optional(),
  fssaiNumber: z.string().optional(),
  bankAccountName: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  upiId: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
  profilePhotoFile: z.custom<FileList>().optional(),
  idProofFile: z.custom<FileList>().optional(),
  vehicleRcFile: z.custom<FileList>().optional(),
  drivingLicenseFile: z.custom<FileList>().optional(),
  cancelledChequeFile: z.custom<FileList>().optional(),
});

type DeliveryPartnerSchema = z.infer<typeof deliveryPartnerSchema>;

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const DeliveryPartnerForm: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DeliveryPartnerSchema>({
    resolver: zodResolver(deliveryPartnerSchema),
    defaultValues: {
      chaknaEnabled: false,
      foodTradeLicenseAvailable: false,
      termsAccepted: true,
    },
  });

  const onSubmit = async (data: DeliveryPartnerSchema) => {
    setSubmitSuccess(null);
    try {
      const form = new FormData();

      // Required text
      form.append("full_name", data.fullName);
      form.append("email", data.email);
      form.append("phone_no", data.phoneNo);
      form.append("password", data.password);

      // Optional text
      if (data.dateOfBirth) form.append("date_of_birth", data.dateOfBirth);
      if (data.gender) form.append("gender", data.gender);
      if (data.altPhoneNo) form.append("alt_phone_no", data.altPhoneNo);
      if (data.idProofType) form.append("id_proof_type", data.idProofType);
      if (data.addressLine) form.append("address_line", data.addressLine);
      if (data.vehicleType) form.append("vehicle_type", data.vehicleType);
      if (data.vehicleModel) form.append("vehicle_model", data.vehicleModel);
      if (data.vehicleNumber) form.append("vehicle_number", data.vehicleNumber);
      if (data.drivingLicenseNumber) form.append("driving_license_number", data.drivingLicenseNumber);
      if (data.servicingZones) form.append("servicing_zones", data.servicingZones);
      
      form.append("chakna_enabled", data.chaknaEnabled ? "true" : "false");
      form.append("food_trade_license_available", data.foodTradeLicenseAvailable ? "true" : "false");
      
      if (data.fssaiNumber) form.append("fssai_number", data.fssaiNumber);
      if (data.bankAccountName) form.append("bank_account_name", data.bankAccountName);
      if (data.bankName) form.append("bank_name", data.bankName);
      if (data.accountNumber) form.append("account_number", data.accountNumber);
      if (data.ifscCode) form.append("ifsc_code", data.ifscCode);
      if (data.upiId) form.append("upi_id", data.upiId);

      // Files — send as UploadFile on the "*_url" keys
      const profilePhoto = data.profilePhotoFile?.[0];
      if (profilePhoto) form.append("profile_photo_url", profilePhoto);
      
      const idProof = data.idProofFile?.[0];
      if (idProof) form.append("id_proof_url", idProof);

      const vehicleRc = data.vehicleRcFile?.[0];
      if (vehicleRc) form.append("vehicle_rc_url", vehicleRc);

      const dLicense = data.drivingLicenseFile?.[0];
      if (dLicense) form.append("driving_license_url", dLicense);

      const cCheque = data.cancelledChequeFile?.[0];
      if (cCheque) form.append("cancelled_cheque_url", cCheque);

      await sendDeliveryPartnerMessage(form);
      setSubmitSuccess("Application submitted! Our team will contact you soon.");
      reset();
    } catch (err: any) {
      console.error("Delivery partner submit error", err);
      let errorMsg = "Submission failed. Please try again.";
      const detail = err?.response?.data?.detail;
      
      if (Array.isArray(detail)) {
        errorMsg = detail.map((e: any) => {
          const field = e.loc?.[e.loc.length - 1] || "Field";
          return `${field}: ${e.msg}`;
        }).join(", ");
      } else if (typeof detail === "string") {
        errorMsg = detail;
      } else if (err?.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (typeof err?.response?.data === "string") {
        errorMsg = err.response.data;
      } else if (err?.message) {
        errorMsg = err.message;
      }

      setError("root", {
        type: "server",
        message: errorMsg,
      });
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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    className={`${inputClass} ${errors.fullName ? "border-red-500" : ""}`}
                    placeholder="John Doe"
                    {...register("fullName")}
                  />
                  {errors.fullName && <span className="text-xs text-red-500 ml-1">{errors.fullName.message}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      {...register("dateOfBirth")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Gender
                    </label>
                    <select
                      className={`${inputClass} appearance-none`}
                      {...register("gender")}
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
                    className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
                    placeholder="john@example.com"
                    {...register("email")}
                  />
                  {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`${inputClass} ${errors.phoneNo ? "border-red-500" : ""}`}
                      placeholder="9876543210"
                      {...register("phoneNo")}
                    />
                    {errors.phoneNo && <span className="text-xs text-red-500 ml-1">{errors.phoneNo.message}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Alt Phone
                    </label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="Optional"
                      {...register("altPhoneNo")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    className={`${inputClass} ${errors.password ? "border-red-500" : ""}`}
                    placeholder="Create a strong password"
                    {...register("password")}
                  />
                  {errors.password && <span className="text-xs text-red-500 ml-1">{errors.password.message}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm"
                    {...register("profilePhotoFile")}
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
                    className={`${inputClass} appearance-none`}
                    {...register("idProofType")}
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
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("idProofFile")}
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
                    className={`${inputClass} resize-none`}
                    placeholder="Full Address"
                    {...register("addressLine")}
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
                      className={`${inputClass} appearance-none`}
                      {...register("vehicleType")}
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
                      {...register("vehicleModel")}
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
                    {...register("vehicleNumber")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Vehicle RC
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("vehicleRcFile")}
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
                    {...register("drivingLicenseNumber")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> License Document
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("drivingLicenseFile")}
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
                    {...register("servicingZones")}
                  />
                </div>
              </div>

              {/* === ADDITIONAL INFO === */}
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
                        {...register("chaknaEnabled")}
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
                        {...register("foodTradeLicenseAvailable")}
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
                    {...register("fssaiNumber")}
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
                      {...register("bankAccountName")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Bank Name
                    </label>
                    <input
                      className={inputClass}
                      placeholder="HDFC Bank"
                      {...register("bankName")}
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
                      {...register("accountNumber")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      IFSC Code
                    </label>
                    <input
                      className={inputClass}
                      placeholder="HDFC0000123"
                      {...register("ifscCode")}
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
                      {...register("upiId")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Cancelled Cheque
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("cancelledChequeFile")}
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
                      {...register("termsAccepted")}
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
                {errors.termsAccepted && <span className="text-xs text-red-500 mt-1 block">{errors.termsAccepted.message}</span>}
              </div>

              {errors.root && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">
                  {errors.root.message}
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
