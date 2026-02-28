import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import TermsConditionsModal from "./TermsConditionsModal";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Info,
  Upload,
  Building2,
} from "lucide-react";
import { sendDistributorMessage } from "@/api/services/distributor.service";

const distributorSchema = z.object({
  tradeName: z.string().min(1, "Trade Name is required"),
  registeredAddress: z.string().min(1, "Registered Address is required"),
  bankAcName: z.string().min(1, "Account Name is required"),
  bankAcNo: z.string().min(1, "Account Number is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  phnNo: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),

  businessType: z.string().optional(),
  gstNo: z.string().optional(),
  panNo: z.string().optional(),
  tanNo: z.string().optional(),
  msmeRegistered: z.boolean().optional(),
  warehouseAddress: z.string().optional(),
  warehouseLicenseNo: z.string().optional(),
  exciseLicenseNo: z.string().optional(),
  licenseValidFrom: z.string().optional(),
  licenseValidUpto: z.string().optional(),
  bankBranchName: z.string().optional(),
  upiId: z.string().optional(),
  deliveryFleetSize: z.string().optional(),
  servicingArea: z.string().optional(),
  vehicleCount: z.string().optional(),
  contactPersonName: z.string().optional(),
  altPhnNo: z.string().optional(),

  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),

  companyIncorporationCertificateFile: z.custom<FileList>().optional(),
  panFile: z.custom<FileList>().optional(),
  gstCertificateFile: z.custom<FileList>().optional(),
  msmeCertificateFile: z.custom<FileList>().optional(),
  exciseLicenseFile: z.custom<FileList>().optional(),
  tradeLicenseFile: z.custom<FileList>().optional(),
  firesafetyCertificateFile: z.custom<FileList>().optional(),
  transporationLogisticsFile: z.custom<FileList>().optional(),
  cancelledChequeFile: z.custom<FileList>().optional(),
});

type DistributorSchema = z.infer<typeof distributorSchema>;

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const DistributorForm: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DistributorSchema>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      msmeRegistered: false,
      termsAccepted: true,
    },
  });

  const onSubmit = async (data: DistributorSchema) => {
    setSubmitSuccess(null);
    try {
      const form = new FormData();

      // Required Text
      form.append("trade_name", data.tradeName);
      form.append("registered_address", data.registeredAddress);
      form.append("bank_ac_name", data.bankAcName);
      form.append("bank_ac_no", data.bankAcNo);
      form.append("ifsc_code", data.ifscCode);
      form.append("phn_no", data.phnNo);
      form.append("email", data.email);

      // Optional Text
      if (data.businessType) form.append("business_type", data.businessType);
      if (data.gstNo) form.append("gst_no", data.gstNo);
      if (data.panNo) form.append("pan_no", data.panNo);
      if (data.tanNo) form.append("tan_no", data.tanNo);
      
      form.append("msme_registered", data.msmeRegistered ? "true" : "false");
      
      if (data.warehouseAddress) form.append("warehouse_address", data.warehouseAddress);
      if (data.warehouseLicenseNo) form.append("warehouse_license_no", data.warehouseLicenseNo);
      if (data.exciseLicenseNo) form.append("excise_license_no", data.exciseLicenseNo);
      if (data.licenseValidFrom) form.append("license_valid_from", data.licenseValidFrom);
      if (data.licenseValidUpto) form.append("license_valid_upto", data.licenseValidUpto);
      if (data.bankBranchName) form.append("bank_branch_name", data.bankBranchName);
      if (data.upiId) form.append("upi_id", data.upiId);
      if (data.deliveryFleetSize) form.append("delivery_fleet_size", data.deliveryFleetSize);
      if (data.servicingArea) form.append("servicing_area", data.servicingArea);
      if (data.vehicleCount) form.append("vehicle_count", data.vehicleCount);
      if (data.contactPersonName) form.append("contact_person_name", data.contactPersonName);
      if (data.altPhnNo) form.append("alt_phn_no", data.altPhnNo);

      // Files
      const gstCert = data.gstCertificateFile?.[0];
      const panFile = data.panFile?.[0];
      const msmeCert = data.msmeCertificateFile?.[0];
      const fireNoc = data.firesafetyCertificateFile?.[0];
      const exciseFile = data.exciseLicenseFile?.[0];
      const incCert = data.companyIncorporationCertificateFile?.[0];
      const tradeFile = data.tradeLicenseFile?.[0];
      const chequeFile = data.cancelledChequeFile?.[0];
      const logisticFile = data.transporationLogisticsFile?.[0];

      if (gstCert) {
        form.append("gst_certificate_file", gstCert);
        form.append("gst_certificate_url", gstCert);
      }
      if (panFile) {
        form.append("pan_file", panFile);
        form.append("pan_url", panFile);
      }
      if (msmeCert) {
        form.append("msme_certificate_file", msmeCert);
        form.append("msme_certificate_url", msmeCert);
      }
      if (fireNoc) {
        form.append("firesafety_certificate_file", fireNoc);
        form.append("firesafety_certificate_url", fireNoc);
      }
      if (exciseFile) {
        form.append("excise_license_file", exciseFile);
        form.append("excise_license_url", exciseFile);
      }
      if (incCert) {
        form.append("company_incorporation_certificate_file", incCert);
        form.append("company_incorporation_certificate_url", incCert);
      }
      if (tradeFile) {
        form.append("trade_license_file", tradeFile);
        form.append("trade_license_url", tradeFile);
      }
      if (chequeFile) {
        form.append("cancelled_cheque_file", chequeFile);
        form.append("cancelled_cheque_url", chequeFile);
      }
      if (logisticFile) {
        form.append("transporation_logistics_file", logisticFile);
        form.append("transporation_logistics_url", logisticFile);
      }

      await sendDistributorMessage(form);
      setSubmitSuccess("Application submitted! Our team will contact you soon.");
      reset();
    } catch (err: any) {
      console.error("Distributor submit error", err);
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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    className={`${inputClass} ${errors.tradeName ? "border-red-500" : ""}`}
                    placeholder="ABC Beverages Distibutors Pvt Ltd"
                    {...register("tradeName")}
                  />
                  {errors.tradeName && <span className="text-xs text-red-500 ml-1">{errors.tradeName.message}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Business Type
                  </label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Private Limited, Partnership"
                    {...register("businessType")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Company Incorporation Certificate{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("companyIncorporationCertificateFile")}
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
                      {...register("panNo")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> PAN Upload{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-xs"
                      {...register("panFile")}
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
                      {...register("gstNo")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> GST Certificate{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-xs"
                      {...register("gstCertificateFile")}
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
                    {...register("tanNo")}
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
                        {...register("msmeRegistered")}
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
                    <Upload size={12} /> MSME Certificate{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("msmeCertificateFile")}
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
                    className={`${inputClass} resize-none ${errors.registeredAddress ? "border-red-500" : ""}`}
                    placeholder="Full Registered Office Address"
                    {...register("registeredAddress")}
                  />
                  {errors.registeredAddress && <span className="text-xs text-red-500 ml-1">{errors.registeredAddress.message}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Warehouse Address
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Warehouse / Godown Address"
                    {...register("warehouseAddress")}
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
                      {...register("warehouseLicenseNo")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Excise License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="FL-XYZ"
                      {...register("exciseLicenseNo")}
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
                      {...register("licenseValidFrom")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      License Valid Upto
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      {...register("licenseValidUpto")}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Excise License Document{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("exciseLicenseFile")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Trade License{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("tradeLicenseFile")}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> Fire Safety Certificate{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("firesafetyCertificateFile")}
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
                      {...register("deliveryFleetSize")}
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
                      {...register("vehicleCount")}
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
                    {...register("servicingArea")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Logistics & Transport Details{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("transporationLogisticsFile")}
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
                    className={`${inputClass} ${errors.bankAcName ? "border-red-500" : ""}`}
                    placeholder="Account Name"
                    {...register("bankAcName")}
                  />
                  {errors.bankAcName && <span className="text-xs text-red-500 ml-1">{errors.bankAcName.message}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Account No <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={`${inputClass} ${errors.bankAcNo ? "border-red-500" : ""}`}
                      placeholder="50123456789"
                      {...register("bankAcNo")}
                    />
                    {errors.bankAcNo && <span className="text-xs text-red-500 ml-1">{errors.bankAcNo.message}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      className={`${inputClass} ${errors.ifscCode ? "border-red-500" : ""}`}
                      placeholder="HDFC0000123"
                      {...register("ifscCode")}
                    />
                    {errors.ifscCode && <span className="text-xs text-red-500 ml-1">{errors.ifscCode.message}</span>}
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
                      {...register("bankBranchName")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      UPI ID
                    </label>
                    <input
                      className={inputClass}
                      placeholder="business@upi"
                      {...register("upiId")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Cancelled Cheque{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("cancelledChequeFile")}
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
                    {...register("contactPersonName")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    Email Address <span className="text-red-500">*</span>{" "}
                    <Info size={12} className="text-gray-300" />
                  </label>
                  <input
                    type="email"
                    className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
                    placeholder="contact@company.com"
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
                      className={`${inputClass} ${errors.phnNo ? "border-red-500" : ""}`}
                      placeholder="9876543210"
                      {...register("phnNo")}
                    />
                    {errors.phnNo && <span className="text-xs text-red-500 ml-1">{errors.phnNo.message}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Alt Phone Number
                    </label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="Optional"
                      {...register("altPhnNo")}
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
                      {...register("termsAccepted")}
                    />
                    <div className="w-5 h-5 border-2 border-gray-200 rounded peer-checked:bg-[#E23744] peer-checked:border-[#E23744] transition-all" />
                    <CheckCircle className="absolute inset-0 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                    I verify that all submitted documents and information are
                    genuine. I agree to Bhukk's Distributor{" "}
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

export default DistributorForm;
