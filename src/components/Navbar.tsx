"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="absolute top-4 right-4 z-50 w-full flex justify-between items-center">
      {/* Show logo only if not on the homepage */}
      {pathname !== "/" && (
        <Link href="/" aria-label="Go to Homepage">
          <Image
            src="/logo.svg"
            alt="Logo GF"
            width={0}
            height={0}
            className="h-[40px] sm:h-[55px] dark:invert w-auto absolute left-8 sm:left-12 top-2 sm:top-4 hover:animate-bounce"
          />
        </Link>
      )}

      {/* Hamburger Icon */}
      <button
        className="block sm:hidden p-2 mt-2 top-0 right-0 absolute"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <div className="w-8 h-[3px] mb-2 transition-all duration-300" style={{ backgroundColor: "var(--foreground)" }}></div>
        <div className="w-8 h-[3px] mb-2 transition-all duration-300" style={{ backgroundColor: "var(--foreground)" }}></div>
        <div className="w-8 h-[3px] transition-all duration-300" style={{ backgroundColor: "var(--foreground)" }}></div>
      </button>

      {/* Menu Links */}
      <div
        ref={menuRef}
        className={`${
          isOpen ? "block" : "hidden"
        } sm:block absolute top-0 right-0 p-4 shadow-md sm:shadow-none 
        bg-white dark:bg-black sm:bg-transparent sm:dark:bg-transparent`}
      >
        <ul className="space-y-2 text-right">
          <li>
            <Link href="/work" className="menu-link">
              <span className="highlight-link">see</span> my work
            </Link>
          </li>
         {/*} <li>
            <Link href="/blog" className="menu-link">
              <span className="highlight-link">read</span> my stuff
            </Link>
          </li>*/}
          <li>
            <Link href="/contact" className="menu-link">
              <span className="highlight-link">contact</span> me
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
