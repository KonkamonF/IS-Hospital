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

  return (
    <header className="relative">
      <div className="flex items-center gap-4 px-4">
        <nav className="hidden md:flex items-center gap-4">
          <a href="/">Home</a>
          <a href="/">Services</a>
          <a href="/">Visitor Guides</a>
          <a href="/">Be Healthy</a>
          <a href="/">About Us</a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="shrink-0"
        >
          <img src={LogononText} alt="Logo" className="w-[10%] min-w-[56px]" />
        </button>

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
            className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <IoPersonCircleOutline size={24} />
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white text-[#004d21] overflow-hidden z-50
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
