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
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 inline-flex p-2 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#cd2d33]"
        >
          <IoClose size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <form action="" className="flex flex-col gap-2">
            <label htmlFor="username">E-mail</label>
            <input
              type="text"
              id="username"
              placeholder="E-mail"
              className="
    w-full px-3 py-2 rounded-lg
    bg-white/95 text-[#2155CD] placeholder-[#2155CD]/50
    border border-[#42C2FF]/60 shadow-sm
    hover:border-[#a1e1ff]
    focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
    focus:ring-offset-2 focus:ring-offset-[#2155CD]
    focus:border-transparent
    transition
  "
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              className="
    w-full px-3 py-2 rounded-lg
    bg-white/95 text-[#2155CD] placeholder-[#2155CD]/50
    border border-[#42C2FF]/60 shadow-sm
    hover:border-[#a1e1ff]
    focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
    focus:ring-offset-2 focus:ring-offset-[#2155CD]
    focus:border-transparent
    transition
  "
            />
          </form>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-[#42C2FF] px-4 py-2 font-medium text-white hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
                  focus:ring-offset-2 focus:ring-offset-[#2155CD]
                  transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
