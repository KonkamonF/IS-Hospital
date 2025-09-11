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

  const handleNav = (href) => (e) => {
    if (e.type === "mouseenter") {
      e.currentTarget.focus();
    }
    if (e.type === "click") {
      e.preventDefault();
      e.currentTarget.focus();
      window.location.assign(href);
    }
  };

  return (
    <header className="relative">
      <div className="flex items-center w-full max-w-7xl mx-auto px-4">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <img src={LogononText} alt="Logo" className="w-[70px]" />
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
              onMouseEnter={handleNav(l.href)}
              onClick={handleNav(l.href)}
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

        <div
          className="relative ml-auto md:mr-6 lg:mr-10"
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
            className={`absolute
        left-1/2 -translate-x-1/2 top-[calc(100%+0.5rem)]
        md:left-auto md:right-0 md:translate-x-0 md:top-full md:mt-2
        min-w-[190px] w-56
        overflow-hidden z-50 rounded-xl border border-[#42C2FF]
        text-[#2155CD] bg-white shadow-md divide-y divide-[#42C2FF]
        transform origin-top md:origin-top-right transition
        ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }
      `}
            role="menu"
          >
            <a
              href="/signin"
              role="menuitem"
              className="flex items-center justify-between px-3 py-2 hover:bg-[#42C2FF] hover:text-white"
              onClick={() => setOpen(false)}
            >
              <span>Sign-In</span>
              <MdPersonSearch />
            </a>
            <a
              href="/signup"
              role="menuitem"
              className="flex items-center justify-between px-3 py-2 hover:bg-[#42C2FF] hover:text-white"
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
        className={`md:hidden px-8 transition-[max-height,opacity] duration-300 ease-out overflow-hidden
          ${mobileOpen ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
      >
        <div className="rounded-xl border-1 border-[#42C2FF] text-[#2155CD] shadow-md divide-y divide-[#42C2FF] ">
          <a
            href="/"
            className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
          >
            Home
          </a>
          <a
            href="/"
            className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
          >
            Services
          </a>
          <a
            href="/"
            className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
          >
            Visitor Guides
          </a>
          <a
            href="/"
            className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
          >
            Be Healthy
          </a>
          <a
            href="/"
            className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
          >
            About Us
          </a>
        </div>
      </div>
    </header>
  );
}
