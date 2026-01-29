import React, { useState } from "react";

const AppPromotion: React.FC = () => {
  const [contactMethod, setContactMethod] = useState<"email" | "phone">(
    "email",
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 overflow-hidden">
      {/* Phone Mockup Image */}
      <div className="flex-1 flex justify-center md:justify-end animate-scale-in">
        <div className="relative max-w-[280px]">
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=500"
            alt="Bhukk Mobile App"
            className="rounded-[3rem] border-8 border-[#1C1C1C] shadow-2xl z-10 relative"
          />
          {/* Subtle glow behind the phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#E23744]/10 blur-[80px] -z-0 animate-pulse"></div>
        </div>
      </div>

      {/* Download Content */}
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div
          className="space-y-4 animate-fade-in-up delay-200 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <h2 className="text-4xl font-extrabold text-[#1C1C1C]">
            Get the Bhukk app
          </h2>
          <p className="text-[#696969] text-lg">
            We will send you a link, open it on your phone to download the app
          </p>
        </div>

        {/* Form Controls */}
        <div
          className="space-y-6 animate-fade-in-up delay-300 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center justify-center md:justify-start gap-8">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="contact"
                checked={contactMethod === "email"}
                onChange={() => setContactMethod("email")}
                className="w-5 h-5 accent-[#E23744]"
              />
              <span className="text-[#1C1C1C] font-medium">Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="contact"
                checked={contactMethod === "phone"}
                onChange={() => setContactMethod("phone")}
                className="w-5 h-5 accent-[#E23744]"
              />
              <span className="text-[#1C1C1C] font-medium">Phone</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder={contactMethod === "email" ? "Email" : "Phone"}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E23744] transition-colors"
            />
            <button className="bg-[#E23744] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c62833] transition-colors active:scale-95">
              Share App Link
            </button>
          </div>
        </div>

        {/* Store Badges */}
        <div
          className="space-y-4 animate-fade-in-up delay-400 opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <p className="text-sm text-[#9C9C9C] font-medium uppercase tracking-wider">
            Download app from
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <img
              src="/assets/playstore.png"
              alt="Play Store"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("show-coming-soon"))
              }
              className="h-9 cursor-pointer transition-transform hover:scale-105"
            />
            <img
              src="/assets/App.png"
              alt="App Store"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("show-coming-soon"))
              }
              className="h-9 cursor-pointer transition-transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;
