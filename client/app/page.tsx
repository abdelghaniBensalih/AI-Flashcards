"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParticlesBackground from "@/components/ParticlesBackground";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll and active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "pricing"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`relative min-h-screen font-sans`}>
      {/* Preload resources */}
      <link rel="preload" href="/demo.mp4" as="video" />
      <link rel="preload" href="/logo.svg" as="image" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm z-10">
        {/* Logo and title */}
        <div className="flex items-center space-x-3">
          <Link href="/" aria-label="Homepage" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="FlashFlorte logo"
              width={32}
              height={32}
              priority
              className="h-8 w-8"
            />
            <h1 className={`ml-2 text-xl font-bold font-heading`}>
              FlashFlorte
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="text-gray-900 dark:text-gray-100 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
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
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
          <ModeToggle />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-lg font-medium transition-colors ${
                activeSection === "home"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
              aria-current={activeSection === "home" ? "page" : undefined}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className={`text-lg font-medium transition-colors ${
                activeSection === "features"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
              aria-current={activeSection === "features" ? "page" : undefined}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`text-lg font-medium transition-colors ${
                activeSection === "pricing"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
              aria-current={activeSection === "pricing" ? "page" : undefined}
            >
              Pricing
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href="/dashboard" aria-label="Go to Dashboard">
              <Button
                className={`font-heading font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors`}
              >
                Go to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 mt-16 bg-white dark:bg-gray-900 md:hidden transition-all duration-300 ease-in-out">
          <div className="flex flex-col p-6 space-y-4">
            <button
              onClick={() => {
                scrollToSection("home");
                setMenuOpen(false);
              }}
              className={`text-xl font-semibold py-3 px-4 rounded-lg transition-colors ${
                activeSection === "home"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-current={activeSection === "home" ? "page" : undefined}
            >
              Home
            </button>
            <button
              onClick={() => {
                scrollToSection("features");
                setMenuOpen(false);
              }}
              className={`text-xl font-semibold py-3 px-4 rounded-lg transition-colors ${
                activeSection === "features"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-current={activeSection === "features" ? "page" : undefined}
            >
              Features
            </button>
            <button
              onClick={() => {
                scrollToSection("pricing");
                setMenuOpen(false);
              }}
              className={`text-xl font-semibold py-3 px-4 rounded-lg transition-colors ${
                activeSection === "pricing"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              aria-current={activeSection === "pricing" ? "page" : undefined}
            >
              Pricing
            </button>
            <Link
              href="/dashboard"
              className="mt-4"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                className={`w-full font-heading font-semibold text-lg py-6 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors`}
              >
                Go to dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section - Split Layout */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between min-h-screen pt-20 md:pt-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        {/* Left Column - Text Content */}
        <div className="w-full md:w-1/2 md:pr-8 lg:pr-12 mb-12 md:mb-0">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading`}
          >
            More time studying with flashcards,
            <span className="text-green-600 dark:text-green-400">
              {" "}
              less time creating them.
            </span>
          </h1>

          <ParticlesBackground />

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
            Create flashcards using text and images, organize them into decks,
            and study them with ease. Our intelligent system helps you focus on
            what matters most - learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className={`font-heading font-semibold text-lg py-6 px-8 bg-green-700 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-300 transition-all hover:scale-105`}
              >
                Get Started for Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className={`font-heading font-semibold text-lg py-6 px-8 transition-all hover:scale-105`}
              onClick={() => scrollToSection("pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>

        {/* Right Column - Video */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-lg">
            <video
              src="/demo.mp4"
              
              className="w-full max-w-1xl rounded-2xl mt-10 border-2 p-3"
              autoPlay
              muted
              playsInline
              loop
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
              Powerful Features
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-heading`}>
              Study Smarter, Not Harder
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform is designed to help you maximize your learning
              efficiency with intuitive tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              data-aos="fade-up"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                </div>
                <h3 className={`text-xl font-semibold mb-3 font-heading`}>
                  Create Flashcards
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Easily create your own flashcards with our intuitive
                  interface. Add text, images, and format your content.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                </div>
                <h3 className={`text-xl font-semibold mb-3 font-heading`}>
                  Manage Decks
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Organize and manage your flashcard decks with ease. Categorize
                  by subject, priority, or custom tags.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
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
                </div>
                <h3 className={`text-xl font-semibold mb-3 font-heading`}>
                  Smart Review
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our spaced repetition algorithm shows you cards at optimal
                  intervals for maximum retention.
                </p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="p-6">
                <div className="w-14 h-14 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-semibold mb-3 font-heading`}>
                  Track Progress
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Detailed statistics and progress tracking help you identify
                  strengths and areas needing improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section */}
      <section
        id="pricing"
        className="py-4 px-6 bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
              Simple Pricing
            </span>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-heading`}>
              Plans That Fit Your Needs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you're a casual learner or a power user, we have a plan
              for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 hover:shadow-xl">
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 font-heading`}>Free</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Great for getting started
                </p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Up to 5 decks</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>50 cards per deck</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Basic review modes</span>
                  </li>
                </ul>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full py-6 text-lg font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border-2 border-green-500 transform scale-105 z-10">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                POPULAR
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 font-heading`}>Pro</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For serious learners
                </p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Unlimited decks</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Unlimited cards</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Advanced review modes</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Spaced repetition</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Detailed analytics</span>
                  </li>
                </ul>
                <Button
                  className="w-full py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  onClick={() => scrollToSection("home")}
                >
                  Upgrade Now
                </Button>
              </div>
            </div>

            {/* Team Plan */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:scale-105 hover:shadow-xl">
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-2 font-heading`}>Team</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  For study groups & classes
                </p>
                <div className="mb-8">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Up to 10 members</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Shared decks</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Collaborative features</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold"
                  onClick={() => scrollToSection("home")}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 font-heading`}>
            Ready to supercharge your learning?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-green-100">
            Join thousands of students and professionals who are studying
            smarter with FlashFlorte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className={`font-heading font-semibold text-lg py-6 px-8 bg-white text-green-700 hover:bg-gray-100 hover:text-green-800 transition-all hover:scale-105`}
              >
                Get Started for Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className={`font-heading font-semibold text-lg py-6 px-8 dark:text-white text-black border-white hover:bg-white/10 transition-all hover:scale-105`}
              onClick={() => scrollToSection("pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3
                className={`text-lg font-semibold text-white mb-4 font-heading`}
              >
                FlashFlorte
              </h3>
              <p className="mb-4">
                Making learning efficient and effective through smart
                flashcards.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/abdelghaniBensalih/AI-Flashcards"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p>
              © {new Date().getFullYear()} FlashFlorte. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
