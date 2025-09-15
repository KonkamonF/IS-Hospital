import React, { useRef, useState } from "react";
import LogononText from "../assets/LogononText.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdPersonAddAlt1, MdPersonSearch } from "react-icons/md";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const openMenu = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-3 py-2 rounded-md hover:bg-gray-200
                   focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
                   focus:ring-offset-2 focus:ring-offset-[#2155CD] transition"
      >
        {label}
      </button>

      <div
        className={`absolute right-0 top-full mt-2
          w-[150px] min-w-[150px]
          overflow-hidden z-50 rounded-xl border border-[#42C2FF]
          shadow-md divide-y divide-[#42C2FF] bg-white 
          transform origin-top-right transition
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        role="menu"
      >
        {items.map((it, i) => (
          <a
            key={i}
            href={it.href}
            className="block px-3 py-2 hover:bg-[#42C2FF] hover:text-white"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            {it.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const handleClickSignIn = (e) => {
    e.preventDefault();
    setOpen(false);
    setIsSignInOpen(true);
  };

  const handleClickSignUp = (e) => {
    e.preventDefault();
    setOpen(false);
    setIsSignUpOpen(true);
  };

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const toggleMenu = () => setOpen((v) => !v);

  return (
    <>
      {isSignInOpen && <SignIn onClose={() => setIsSignInOpen(false)} />}
      {isSignUpOpen && <SignUp onSignUp={() => setIsSignUpOpen(false)} />}
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
            <a
              href="/"
              className="px-3 py-2 rounded-md hover:bg-gray-200
                       focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
                       focus:ring-offset-2 focus:ring-offset-[#2155CD] transition"
            >
              Home
            </a>

            <NavDropdown
              label="Services"
              items={[
                { label: "1", href: "/Services/1" },
                { label: "2", href: "/Services/2" },
              ]}
            />
            <NavDropdown
              label="Visitor Guides"
              items={[
                { label: "1", href: "/Visitor/1" },
                { label: "2", href: "/Visitor/2" },
              ]}
            />
            <NavDropdown
              label="Be Healthy"
              items={[
                { label: "1", href: "/Healthy/1" },
                { label: "2", href: "/Healthy/2" },
              ]}
            />

            <a
              href="/"
              className="px-3 py-2 rounded-md hover:bg-gray-200
                       focus:outline-none focus:ring-2 focus:ring-[#a1e1ff]
                       focus:ring-offset-2 focus:ring-offset-[#2155CD] transition"
            >
              About Us
            </a>
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
              className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200
                       focus:outline-none focus:ring-2 focus:ring-[#cd2d33]"
            >
              <IoPersonCircleOutline size={24} color="#cd2d33" />
            </button>

            <div
              className={`absolute
              left-1/2 -translate-x-3/4 top-[calc(100%+1rem)]
              md:left-auto md:right-0 md:translate-x-0 md:top-full md:mt-2
              w-[150px] bg-white
              overflow-hidden z-50 rounded-xl border border-[#42C2FF]
              shadow-md divide-y divide-[#42C2FF]
              transform origin-top md:origin-top-right transition
              ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
            >
              <a
                href="#"
                role="menuitem"
                className="flex items-center justify-between px-3 py-2 hover:bg-[#42C2FF] hover:text-white"
                onClick={handleClickSignIn}
              >
                <span>Sign-In</span>
                <MdPersonSearch color="#cd2d33" />
              </a>
              <a
                href="#"
                role="menuitem"
                className="flex items-center justify-between px-3 py-2 hover:bg-[#42C2FF] hover:text-white"
                onClick={handleClickSignUp}
              >
                <span>Sign-Up</span>
                <MdPersonAddAlt1 color="#cd2d33" />
              </a>
            </div>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`md:hidden px-8 transition-[max-height,opacity] duration-300 ease-out overflow-hidden
          ${mobileOpen ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
        >
          <div className="rounded-xl border-1 border-[#42C2FF] shadow-md divide-y divide-[#42C2FF]">
            <a
              href="/"
              className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
            >
              Home
            </a>
            <a
              href="/Services"
              className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
            >
              Services
            </a>
            <a
              href="/Visitor"
              className="block px-4 py-2 hover:rounded-xl hover:bg-[#42C2FF] hover:text-white"
            >
              Visitor Guides
            </a>
            <a
              href="/Healthy"
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
    </>
  );
}
