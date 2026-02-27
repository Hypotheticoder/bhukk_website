import React, { useEffect, useState } from "react";
import { X, FileText, Loader2 } from "lucide-react";
import {
  fetchTermsConditions,
  type TermsCondition,
} from "../api/services/termsconditions.service";

type Props = {
  open: boolean;
  onClose: () => void;
};

const TermsConditionsModal: React.FC<Props> = ({ open, onClose }) => {
  const [terms, setTerms] = useState<TermsCondition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchTermsConditions()
      .then((data) => {
        if (!cancelled) setTerms(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Failed to load Terms & Conditions.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative w-full max-w-2xl max-h-[85vh]
          bg-white rounded-2xl shadow-2xl
          flex flex-col
          animate-modal-in
          mx-4
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E23744] text-white rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-[#1C1C1C]">
              Terms &amp; Conditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={28} className="animate-spin text-[#E23744]" />
              <span className="ml-3 text-gray-500 font-medium">Loading…</span>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-4 rounded-xl">
              {error}
            </div>
          )}

          {!loading && !error && terms.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              No terms &amp; conditions available.
            </p>
          )}

          {!loading &&
            !error &&
            terms.map((item) => (
              <article key={item.id} className="space-y-2">
                <h3 className="text-base font-bold text-[#1C1C1C]">
                  {item.headline}
                </h3>
                <p className="text-sm text-[#696969] leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </article>
            ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-[#E23744] text-white py-3 rounded-xl font-semibold hover:bg-[#c62833] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsModal;
