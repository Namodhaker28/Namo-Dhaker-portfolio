"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  {
    title: "Blogs",
    path: "/blogs",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navListRef = useRef(null);

  useGSAP(
    () => {
      gsap.from("li", { opacity: 0, stagger: 0.5 });
      gsap.to("li", { rotate: 360 }); // <-- automatically reverted
    },
    { scope: navListRef, revertOnUpdate: false }
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      style={{
        background: scrolled
          ? "linear-gradient(133deg, rgba(0,0,0,1) 0%, rgba(0,1,46,1) 35%, rgba(0,6,50,1) 61%, rgba(20,0,45,1) 90%)"
          : "",
      }}
      className="fixed mx-auto border border-none  top-0 left-0 right-0 z-10  bg-opacity-100 ">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} className="text-2xl md:text-5xl text-white font-semibold">
          ₪äɱ৹
          {/* ₦äɱ৹  */}
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <div>
          <ul ref={navListRef} className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li className="box">
                <Link className="text-white" href={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul ref={navListRef} className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <li className="box">
              <Image
                width="50"
                height="50"
                src="https://img.icons8.com/3d-fluency/50/github.png"
                alt="github"
              />
            </li>
            <li>
              <Image
                width="50"
                height="50"
                src="https://img.icons8.com/3d-fluency/50/linkedin.png"
                alt="linkedin"
              />
            </li>
            <li>
              <Image
                width="50"
                height="50"
                src="https://img.icons8.com/3d-fluency/50/instagram-new.png"
                alt="instagram-new"
              />
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
