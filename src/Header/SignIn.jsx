import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function SignIn({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-white text-slate-900 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <IoClose size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="mt-2 text-slate-600">ใส่ฟอร์มล็อกอินของคุณที่นี่…</p>

          <div className="mt-6">
            <button className="w-full rounded-lg bg-[#42C2FF] px-4 py-2 font-medium text-white hover:opacity-90">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
