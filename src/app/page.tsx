"use client";
import "./Home.css";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Arrow from "./Arrow";

const messages = [
  "builds web apps.",
  "starts and finishes projects.",
  "makes cost-efficient decisions.",
  "communicates well.",
  "leads teams with an open mind.",
  "can migrate projects in cloud.",
  "cares like an owner.",
  "never stops."
];

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [wiggle, setWiggle] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const callButtonRef = useRef<HTMLAnchorElement | null>(null);
  const startRef = useRef<HTMLHeadingElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    setScreenWidth(window.innerWidth); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentCharIndex < messages[messageIndex].length) {
      const typingTimeout = setTimeout(() => {
        setCurrentMessage((prev) => prev + messages[messageIndex][currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, 100);

      return () => {
        clearTimeout(typingTimeout);
      };
    } else {
      const messageTimeout = setTimeout(() => {
        setCurrentMessage("");
        setCurrentCharIndex(0);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);

      return () => {
        clearTimeout(messageTimeout);
      };
    }
  }, [currentCharIndex, messageIndex]);

  // Wiggle effect (stops when hovered)
  useEffect(() => {
    let wiggleTimeout: NodeJS.Timeout;

    const startWiggle = () => {
      if (!isHovered) {
        setWiggle(true);
        setTimeout(() => setWiggle(false), 400); // Reset after animation
      }
      scheduleNextWiggle();
    };

    const scheduleNextWiggle = () => {
      const randomDelay = Math.random() * (5000 - 600) + 600;
      wiggleTimeout = setTimeout(startWiggle, randomDelay);
    };

    scheduleNextWiggle();

    return () => {
      clearTimeout(wiggleTimeout);
    };
  }, [isHovered]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
  
    return () => clearInterval(cursorInterval);
  }, []);  

  return (
    <main className="background flex items-center">
      <div className="content w-full flex flex-col text-left px-8 sm:px-32 lg:px-64">
        <h1 className="font-latoLight text-2xl sm:text-4xl">you have found</h1>
        <h1 className="font-playfair text-5xl sm:text-7xl mt-2">
          Gianluca<br />Fornaciari
        </h1>

        <p className="font-lato text-left text-xl sm:text-2xl lg:text-3xl w-full mt-8">
          with me <span className="highlight" ref={startRef}>you get</span> someone who <br />
          <span className="dynamic-message">
            {currentMessage}
            {showCursor && <span className="beeping-square" aria-hidden="true"></span>}
          </span>
        </p>

        {/* Call to Action Button */}
        <div className="flex w-full justify-end sm:justify-start">
          <Link
            href="https://calendly.com/gianlucafornaciari"
            ref={callButtonRef}
            className={`${wiggle ? "wiggle" : ""} bg-red-700 hover:bg-transparent text-white mt-16 font-latoBold text-6xl hover:text-9xl hover:font-playfair py-4 px-6 ml-auto sm:ml-0 transition-all shadow-2xl inline-block text-center group overflow-hidden relative`}
            aria-label="Contact me to see what I can do for you"
            onMouseEnter={() => setIsHovered(true)} // Stop wiggle on hover
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Green Overlay */}
            <span className="fixed inset-0 bg-green-600 transition-transform transform -translate-x-full group-hover:translate-x-0 z-20"></span>

            {/* Text Content */}
            <div className="relative z-30 text-left">
              <span>Call*</span>
              <span className="hidden group-hover:block text-base mt-8 font-lato">
                <span className="text-xl font-latoBold mb-[-30px]">*</span> Introduction call is <span className="highlight-call">FREE</span> of charge.<br className="lg:hidden"/> Subsequent engagements are billed at € 80/h.
              </span>
            </div>
          </Link>
        </div>

        <span className="absolute inset-0 bg-green-600 transition-transform transform -translate-x-full group-hover:translate-x-0"></span>

        {/* SVG Arrow */}
        <Arrow
          callButtonRef={callButtonRef}
          screenWidth={screenWidth}
          startRef={startRef} // Pass the ref here
        />

        <div className="h-[20vh] sm:h-[10vh]"></div>
      </div>
    </main>
  );
}
