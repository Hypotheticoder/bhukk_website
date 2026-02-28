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
  Factory,
} from "lucide-react";
import { sendManufacturerMessage } from "@/api/services/manufacturer.service";

const manufacturerSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  registeredOfficeAddress: z.string().min(1, "Registered Office Address is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  bankAcNo: z.string().min(1, "Account Number is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  email: z.string().email("Invalid email address"),
  phnNo: z.string().min(10, "Phone number must be at least 10 digits"),

  panNo: z.string().optional(),
  gstNo: z.string().optional(),
  factoryAddress: z.string().optional(),
  exciseNo: z.string().optional(),
  fssaiLicenseNo: z.string().optional(),
  authSignatoryName: z.string().optional(),
  upiId: z.string().optional(),
  altPhnNo: z.string().optional(),

  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),

  incorporationCertificateFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Incorporation Certificate is required"),
  panFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "PAN Document is required"),
  gstCertFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "GST Certificate is required"),
  exciseLicenseFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Excise License is required"),
  fssaiLicenseFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "FSSAI License is required"),
  tradeLicenseFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Trade License is required"),
  authLetterFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Auth Letter is required"),
  cancelledChequeFile: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Cancelled Cheque is required"),
  manufacturerImagesFileList: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, "Manufacturer Images are required"),
});

type ManufacturerSchema = z.infer<typeof manufacturerSchema>;

const inputClass =
  "w-full bg-[#F6F6F6] border-2 border-transparent focus:border-[#E23744] focus:bg-white rounded-xl px-4 py-3 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-300";

const ManufacturerForm: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ManufacturerSchema>({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      termsAccepted: true,
    },
  });

  const onSubmit = async (data: ManufacturerSchema) => {
    setSubmitSuccess(null);
    try {
      const form = new FormData();

      // Required Text
      form.append("company_name", data.companyName);
      form.append("registered_office_address", data.registeredOfficeAddress);
      form.append("bank_name", data.bankName);
      form.append("bank_ac_no", data.bankAcNo);
      form.append("ifsc_code", data.ifscCode);
      form.append("email", data.email);
      form.append("phn_no", data.phnNo);

      // Optional Text
      if (data.panNo) form.append("pan_no", data.panNo);
      if (data.gstNo) form.append("gst_no", data.gstNo);
      if (data.factoryAddress) form.append("factory_address", data.factoryAddress);
      if (data.exciseNo) form.append("excise_no", data.exciseNo);
      if (data.fssaiLicenseNo) form.append("fssai_license_no", data.fssaiLicenseNo);
      if (data.authSignatoryName) form.append("auth_signatory_name", data.authSignatoryName);
      if (data.upiId) form.append("upi_id", data.upiId);
      if (data.altPhnNo) form.append("alt_phn_no", data.altPhnNo);

      // Files
      const incCert = data.incorporationCertificateFile?.[0];
      const panFile = data.panFile?.[0];
      const gstCert = data.gstCertFile?.[0];
      const exciseFile = data.exciseLicenseFile?.[0];
      const fssaiFile = data.fssaiLicenseFile?.[0];
      const tradeFile = data.tradeLicenseFile?.[0];
      const authLetter = data.authLetterFile?.[0];
      const cancelledCheque = data.cancelledChequeFile?.[0];
      const imagesFiles = data.manufacturerImagesFileList;

      if (incCert) {
        form.append("incorporation_certificate", incCert);
        form.append("incorporation_certificate_url", incCert);
      }
      if (panFile) {
        form.append("pan_file", panFile);
        form.append("pan_url", panFile);
      }
      if (gstCert) {
        form.append("gst_cert_file", gstCert);
        form.append("gst_cert_url", gstCert);
      }
      if (exciseFile) {
        form.append("excise_license_file", exciseFile);
        form.append("excise_license_url", exciseFile);
      }
      if (fssaiFile) {
        form.append("fssai_license_file", fssaiFile);
        form.append("fssai_license_url", fssaiFile);
      }
      if (tradeFile) {
        form.append("trade_license_file", tradeFile);
        form.append("trade_license_url", tradeFile);
      }
      if (authLetter) {
        form.append("auth_letter_file", authLetter);
        form.append("auth_letter_url", authLetter);
      }
      if (cancelledCheque) {
        form.append("cancelled_cheque_file", cancelledCheque);
        form.append("cancelled_cheque_url", cancelledCheque);
      }

      if (imagesFiles && imagesFiles.length > 0) {
        Array.from(imagesFiles).forEach((f) => {
          form.append("manufacturer_images", f);
          form.append("manufacturer_images_url", f);
        });
      }

      await sendManufacturerMessage(form);
      setSubmitSuccess("Application submitted! Our team will contact you soon.");
      reset();
    } catch (err: any) {
      console.error("Manufacturer submit error", err);
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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    className={`${inputClass} ${errors.companyName ? "border-red-500" : ""}`}
                    placeholder="M/S Royal Beverages Pvt Ltd"
                    {...register("companyName")}
                  />
                  {errors.companyName && <span className="text-xs text-red-500 ml-1">{errors.companyName.message}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Incorporation Certificate{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("incorporationCertificateFile")}
                  />
                  {errors.incorporationCertificateFile && <span className="text-xs text-red-500 ml-1">{errors.incorporationCertificateFile.message?.toString()}</span>}
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
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      GST No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="27ABCDE1234F1Z5"
                      {...register("gstNo")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> PAN Document{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("panFile")}
                    />
                    {errors.panFile && <span className="text-xs text-red-500 ml-1">{errors.panFile.message?.toString()}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Upload size={12} /> GST Certificate{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="w-full text-sm"
                      {...register("gstCertFile")}
                    />
                    {errors.gstCertFile && <span className="text-xs text-red-500 ml-1">{errors.gstCertFile.message?.toString()}</span>}
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
                    className={`${inputClass} resize-none ${errors.registeredOfficeAddress ? "border-red-500" : ""}`}
                    placeholder="Full Address"
                    {...register("registeredOfficeAddress")}
                  />
                  {errors.registeredOfficeAddress && <span className="text-xs text-red-500 ml-1">{errors.registeredOfficeAddress.message}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Factory Address
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Manufacturing Unit Address"
                    {...register("factoryAddress")}
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
                      {...register("exciseNo")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      FSSAI License No
                    </label>
                    <input
                      className={inputClass}
                      placeholder="1002000000"
                      {...register("fssaiLicenseNo")}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Excise License{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("exciseLicenseFile")}
                  />
                  {errors.exciseLicenseFile && <span className="text-xs text-red-500 ml-1">{errors.exciseLicenseFile.message?.toString()}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> FSSAI License{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("fssaiLicenseFile")}
                  />
                  {errors.fssaiLicenseFile && <span className="text-xs text-red-500 ml-1">{errors.fssaiLicenseFile.message?.toString()}</span>}
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
                  {errors.tradeLicenseFile && <span className="text-xs text-red-500 ml-1">{errors.tradeLicenseFile.message?.toString()}</span>}
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
                    {...register("authSignatoryName")}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Upload size={12} /> Auth Letter Document{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="w-full text-sm"
                    {...register("authLetterFile")}
                  />
                  {errors.authLetterFile && <span className="text-xs text-red-500 ml-1">{errors.authLetterFile.message?.toString()}</span>}
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
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full text-sm"
                    {...register("manufacturerImagesFileList")}
                  />
                  {errors.manufacturerImagesFileList && <span className="text-xs text-red-500 ml-1">{errors.manufacturerImagesFileList.message?.toString()}</span>}
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
                    className={`${inputClass} ${errors.bankName ? "border-red-500" : ""}`}
                    placeholder="HDFC Bank"
                    {...register("bankName")}
                  />
                  {errors.bankName && <span className="text-xs text-red-500 ml-1">{errors.bankName.message}</span>}
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
                      UPI ID
                    </label>
                    <input
                      className={inputClass}
                      placeholder="company@upi"
                      {...register("upiId")}
                    />
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
                    {errors.cancelledChequeFile && <span className="text-xs text-red-500 ml-1">{errors.cancelledChequeFile.message?.toString()}</span>}
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

export default ManufacturerForm;
