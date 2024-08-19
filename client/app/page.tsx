"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";
import Image from "next/image";
import { useState } from "react";

//----------stripe import----
import getStripe from "@/lib/stripe/get-stripe";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

//--------------------------

export default function Home() {
  // State for controlling mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-2 bg-white dark:bg-gray-900 shadow-md z-10">
        {/* Top-left logo and title */}
        <div className="flex items-center space-x-2">
          <Link href="/" aria-label="Homepage">
            <Image
              src="/logo.svg"
              alt="FlashFlorte logo"
              width={30}
              height={30}
              priority
            />
          </Link>
          <h1 className="text-lg font-extrabold tracking-tight">
            FlashFlorte
          </h1>
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="text-gray-900 dark:text-gray-100 focus:outline-none"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Mode Toggle for mobile */}
          <ModeToggle />
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-20 md:hidden">
            <a href="#home" className="block px-4 py-2 text-lg font-semibold">
              Home
            </a>
            <a href="#features" className="block px-4 py-2 text-lg font-semibold">
              Features
            </a>
            <a href="#pricing" className="block px-4 py-2 text-lg font-semibold">
              Pricing
            </a>
            <Link href="/dashboard" className="block px-4 py-2">
              <Button>Go to dashboard</Button>
            </Link>
          </div>
        )}
        {/* Tab Navigation for desktop */}
        <div className="hidden md:flex space-x-4">
          <a href="#home" className="text-lg font-semibold">
            Home
          </a>
          <a href="#features" className="text-lg font-semibold">
            Features
          </a>
          <a href="#pricing" className="text-lg font-semibold">
            Pricing
          </a>
        </div>
        {/* Top-right controls for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Link href="/dashboard" aria-label="Go to Dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Title content */}
      <div
        id="home"
        className="flex flex-col items-center justify-center min-h-screen pt-20 md:pt-24 p-4 text-center"
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            More time studying with flashcards,
            <br />
            less time creating them.
          </h1>
          <ParticlesBackground />
          <p className="text-lg mb-8 max-w-2xl">
            Create flashcards using text and images, organize them into decks,
            and study them with ease.
          </p>
        </div>
        <video
          className="w-full max-w-3xl rounded-2xl mt-10 border-2 p-3"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Demo video showcasing FlashFlorte features"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Features section */}
      <div
        id="features"
        className="flex flex-col items-center min-h-screen p-4"
      >
        <h2 className="text-3xl font-bold mb-16 text-center">Features</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-[1200px] mx-auto">
          <Card className="flex flex-col items-center bg-slate-90 shadow-md rounded-lg p-6 w-full sm:w-80 h-80 hover:shadow-lg transition-shadow duration-300">
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M8 4v16M16 4v16" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Create Flashcards
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily create your own flashcards with our intuitive interface.
            </p>
          </Card>
          <Card className="flex flex-col items-center bg-slate-90 shadow-md rounded-lg p-6 w-full sm:w-80 h-80 hover:shadow-lg transition-shadow duration-300">
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16v12H4z" />
              <path d="M12 6v12M8 12h8" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Manage Decks
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Organize and manage your flashcard decks with ease.
            </p>
          </Card>
          <Card className="flex flex-col items-center bg-slate-90 shadow-md rounded-lg p-6 w-full sm:w-80 h-80 hover:shadow-lg transition-shadow duration-300">
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M12 22l10-5V7L12 2 2 7v10l10 5z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Review Flashcards
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Review your flashcards to reinforce your learning and retention.
            </p>
          </Card>
          <Card className="flex flex-col items-center bg-slate-90 shadow-md rounded-lg p-6 w-full sm:w-80 h-80 hover:shadow-lg transition-shadow duration-300">
            <svg
              className="w-12 h-12 text-green-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M8 4v16M16 4v16" />
            </svg>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Track Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track your progress over time with our detailed statistics.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 px-4 py-8 bg-slate-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 FlashFlorte. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
