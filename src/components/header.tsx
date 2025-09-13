"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="absolute top-0 left-0 w-full z-50 p-4 md:p-6 text-[#f9f0e4]
                 bg-white/5 opacity-10 backdrop-blur-xs"
    >
      <div className="container mx-auto flex justify-end items-center">
        <nav className="hidden md:flex space-x-8">
          <Link href="/ve-du-an">
            <span className="text-lg font-semibold hover:text-red-300 transition-colors duration-300 drop-shadow-sm">
              Về dự án
            </span>
          </Link>
          <Link href="/doc-lap-dan-toc">
            <span className="text-lg font-semibold hover:text-red-300 transition-colors duration-300 drop-shadow-sm">
              Vấn đề độc lập dân tộc
            </span>
          </Link>
          <Link href="/cach-mang-giai-phong-dan-toc">
            <span className="text-lg font-semibold hover:text-red-300 transition-colors duration-300 drop-shadow-sm">
              Cách mạng giải phóng dân tộc
            </span>
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-red-300"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center text-gray-800 shadow-lg">
          {" "}
          <nav className="flex flex-col space-y-4">
            <Link href="/ve-du-an" onClick={() => setIsMenuOpen(false)}>
              <span className="font-semibold block py-2 hover:bg-gray-100 rounded">
                Về dự án
              </span>
            </Link>
            <Link href="/doc-lap-dan-toc" onClick={() => setIsMenuOpen(false)}>
              <span className="font-semibold block py-2 hover:bg-gray-100 rounded">
                Vấn đề độc lập dân tộc
              </span>
            </Link>
            <Link href="/cach-mang-giai-phong-dan-toc" onClick={() => setIsMenuOpen(false)}>
              <span className="font-semibold block py-2 hover:bg-gray-100 rounded">
                Cách mạng giải phóng dân tộc
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
