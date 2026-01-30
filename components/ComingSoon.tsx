import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Sparkles, Check } from "lucide-react";

type ComingSoonProps = {
  show?: boolean;
  onClose?: () => void;
};

const ComingSoon: React.FC<ComingSoonProps> = ({ show = true, onClose }) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("bhukk_waitlist") === "1") {
      setDone(true);
    }
  }, []);

  const submit = () => {
    setError(null);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    localStorage.setItem("bhukk_waitlist", "1");
    setDone(true);
    setEmail("");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* POPUP */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-6xl mx-4 rounded-[32px] overflow-hidden bg-white shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
          >
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition"
            >
              <X />
            </button>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
              {/* LEFT — BRAND STORY */}
              <div className="relative p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-[#E23744] to-[#B71C2A] text-white">
                {/* Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles />
                    <span className="text-sm tracking-widest font-semibold">
                      COMING SOON
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black leading-tight">
                    beverages.
                    <br />
                    Reimagined.
                  </h1>

                  <p className="text-white/90 max-w-md leading-relaxed">
                    Bhukk is crafting a modern, safe and fully compliant way to
                    discover and order premium beverages from verified local
                    stores.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span>✔ Licensed Stores</span>
                    <span>✔ Age Verification</span>
                    <span>✔ Secure Delivery</span>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT — ACTION */}
              <div className="p-10 md:p-14 flex flex-col justify-center">
                {!done ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C1C1C]">
                      Get early access
                    </h2>

                    <p className="mt-2 text-[#555]">
                      Join the waitlist and be among the first to experience
                      Bhukk when we launch.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:ring-2 ring-[#E23744]/40">
                        <Mail className="text-[#E23744]" />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full outline-none text-sm"
                        />
                      </div>

                      {error && <p className="text-sm text-red-600">{error}</p>}

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={submit}
                        className="w-full py-3 rounded-xl bg-[#E23744] text-white font-semibold shadow-lg"
                      >
                        Join Waitlist
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="text-green-600" />
                    </div>

                    <h2 className="text-2xl font-bold">You're on the list!</h2>

                    <p className="text-[#555]">
                      We’ll notify you the moment Bhukk goes live.
                    </p>
                  </motion.div>
                )}

                <p className="mt-8 text-xs text-[#777]">
                  Privacy-first • No spam • Unsubscribe anytime
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoon;
