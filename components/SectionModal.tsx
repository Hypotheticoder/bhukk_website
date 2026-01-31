import React, { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  features: string[];
  onContinue?: () => void;
};

const SectionModal: React.FC<Props> = ({
  open,
  onClose,
  title,
  description,
  features,
  onContinue,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
          relative w-full max-w-2xl
          bg-white rounded-2xl shadow-2xl
          p-6 sm:p-8
          animate-modal-in
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1C1C1C]">{title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="
              p-2 rounded-lg
              text-gray-500
              hover:text-black hover:bg-gray-100
              transition-colors
            "
          >
            <X />
          </button>
        </div>

        {/* Features */}
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#E23744]" />
              <span className="text-[#1C1C1C] leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              border bg-white text-gray-700
              hover:bg-gray-50
              transition
            "
          >
            Close
          </button>

          <button
            onClick={onContinue}
            className="
              px-6 py-2 rounded-lg
              bg-[#E23744] text-white font-semibold
              hover:opacity-90 active:scale-[0.98]
              transition
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionModal;
