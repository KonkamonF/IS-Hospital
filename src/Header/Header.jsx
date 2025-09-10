import React, { useRef, useState } from "react";
import LogononText from "../assets/LogononText.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdPersonAddAlt1, MdPersonSearch } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const toggleMenu = () => setOpen((v) => !v);

  const [active, setActive] = useState("home");
  const base = "px-3 py-2 rounded-md transition";
  const focusOnly =
    "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#004d21]";
  const activeRing =
    "ring-2 ring-amber-400 ring-offset-2 ring-offset-[#004d21]";

  return (
    <header className="relative">
      <div className="flex items-center w-screen">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="shrink-0"
        >
          <img src={LogononText} alt="Logo" className="w-[10%] min-w-[56px]" />
        </button>

        <nav className="hidden md:flex items-center gap-4">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Visitor Guides", href: "/guides" },
            { label: "Be Healthy", href: "/healthy" },
            { label: "About Us", href: "/about" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseDown={(e) => e.preventDefault()} // กัน default ที่ดึงโฟกัส/รีเฟรชทันที
              onClick={(e) => {
                e.currentTarget.focus(); // คงโฟกัสไว้ → ring อยู่
                window.location.assign("/"); // จากนั้นค่อยนำทางด้วย JS
              }}
              className="
         px-3 py-2 rounded-md
    focus:outline-none focus:ring-2 focus:ring-amber-400
    focus:ring-offset-2 focus:ring-offset-[#004d21]
    active:ring-2 active:ring-amber-400
    transition
      "
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* hover ring */}
        {/* <nav className="flex gap-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActive("home");
            }}
            className={`${base} ${active === "home" ? activeRing : focusOnly}`}
          >
            Home
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              setActive("services");
            }}
            className={`${base} ${
              active === "services" ? activeRing : focusOnly
            }`}
          >
            Services
          </a>
        </nav> */}

        <div
          className="relative ml-auto"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <button
            type="button"
            onClick={toggleMenu}
            aria-haspopup="menu"
            aria-expanded={open}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <IoPersonCircleOutline size={24} />
          </button>

          <div
            className={`absolute right-0 mt-2 w-full rounded-lg shadow-lg bg-white text-[#004d21] overflow-hidden z-50
              transform origin-top transition
              ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            role="menu"
          >
            <a
              href="/signin"
              role="menuitem"
              className="flex items-center justify-between px-3 py-2 hover:bg-amber-50"
              onClick={() => setOpen(false)}
            >
              <span>Sign-In</span>
              <MdPersonSearch />
            </a>
            <a
              href="/signup"
              role="menuitem"
              className="flex items-center justify-between px-3 py-2 hover:bg-amber-50 border-t border-gray-100"
              onClick={() => setOpen(false)}
            >
              <span>Sign-Up</span>
              <MdPersonAddAlt1 />
            </a>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden px-4 transition-[max-height,opacity] duration-300 ease-out overflow-hidden
          ${mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="mt-2 rounded-lg bg-white text-[#004d21] shadow-md divide-y divide-gray-200">
          <a href="/" className="block px-4 py-3">
            Home
          </a>
          <a href="/" className="block px-4 py-3">
            Services
          </a>
          <a href="/" className="block px-4 py-3">
            Visitor Guides
          </a>
          <a href="/" className="block px-4 py-3">
            Be Healthy
          </a>
          <a href="/" className="block px-4 py-3">
            About Us
          </a>
        </div>
      </div>
    </header>
  );
}
