import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function SignUp({ onSignUp }) {
  // ล็อกสกรอลล์ของหน้าเฉพาะมือถือ
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767.98px)").matches;
    const htmlEl = document.documentElement;
    const prevOverflow = htmlEl.style.overflowY;

    if (isMobile) {
      htmlEl.style.overflowY = "hidden";
    }
    return () => {
      htmlEl.style.overflowY = prevOverflow || "";
    };
  }, []);

  // ปิดด้วยปุ่ม Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onSignUp?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSignUp]);

  const handleBackdropClick = () => onSignUp?.();
  const stop = (e) => e.stopPropagation();
  const handleSubmit = (e) => e.preventDefault();

  const inputClass = `
    w-full px-3 py-2 rounded-lg
    bg-white/95 placeholder-[#2155CD]/50
    border border-[#42C2FF]/60 shadow-sm
    hover:border-[#a1e1ff]
    focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
    focus:ring-offset-2 focus:ring-offset-[#2155CD]
    focus:border-transparent
    transition
  `;
  const labelClass = "text-sm font-medium";

  return (
    <div
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4
        overflow-y-hidden md:overflow-y-auto  
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <div
        onClick={stop}
        className="
          relative w-full max-w-md rounded-2xl bg-white shadow-2xl
          max-h-[60vh] md:max-h-[45vh] overflow-y-auto overflow-visible
        "
      >
        {/* ปุ่มปิด */}
        <button
          onClick={onSignUp}
          aria-label="Close"
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-[200] inline-flex p-2 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#cd2d33]"
        >
          <IoClose size={20} />
        </button>

        {/* เนื้อหา */}
        <div className="p-6 sm:p-8">
          <h2 id="signup-title" className="text-2xl font-bold text-center">
            Sign Up
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className={labelClass}>
                Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Name..."
                autoComplete="given-name"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className={labelClass}>
                Surname
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Surname..."
                autoComplete="family-name"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="dob" className={labelClass}>
                Date of birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                autoComplete="bday"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="081-234-5678"
                inputMode="tel"
                autoComplete="tel"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password..."
                autoComplete="new-password"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password..."
                autoComplete="new-password"
                required
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
              onClick={onSignUp}
                type="submit"
                className="
                  w-full rounded-lg bg-[#42C2FF] px-4 py-2 font-medium text-white
                  hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
                  focus:ring-offset-2 focus:ring-offset-[#2155CD]
                  transition
                "
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
