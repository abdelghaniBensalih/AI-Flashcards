"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

import { useState, useEffect } from "react";

//----------stripe import----
import getStripe from "@/lib/stripe/get-stripe";

//--------------------------

export default function Home() {
  //-----------------stripe function----------------
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.status === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.error(error.message);
    }
  };
  

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}

      <nav className="relative top-0 left-0 right-0 flex flex-col lg:flex-row items-center p-4">
  {/* Top-left logo and title */}
  <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0">
    <div className="flex items-center space-x-2">
      <svg
        className="w-8 h-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M12 22l10-5V7L12 2 2 7v10l10 5z" />
      </svg>
      <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
        FlashFlorte
      </h1>
    </div>

    {/* Top-right controls */}
    <div className="flex items-center space-x-4 lg:space-x-6">
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="flex space-x-4">
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  </div>

  {/* Tab Navigation */}
  <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-20 lg:flex-1">
    <a href="#home" className="text-lg font-semibold">Home</a>
    <a href="#features" className="text-lg font-semibold">Features</a>
    <a href="#pricing" className="text-lg font-semibold">Pricing</a>
    <SignedIn>
      <div className="lg:hidden mt-4">
        <SignOutButton />
      </div>
    </SignedIn>
  </div>
</nav>
      {/* Title content */}
      <div
        id="home"
        className="flex flex-col items-center justify-center min-h-screen text-center p-4"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            FlashFlorte
          </h1>
          <p className="text-lg mb-8 max-w-lg">
            Discover a smarter way to study with FlashFlorte. Create, manage,
            and review your flashcards effortlessly to boost your learning and
            retention. Get started now and turn your study sessions into
            productive adventures!
          </p>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="mb-4">View My Decks</Button>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Features section */}
   {/* Features section */}
   <div id="features" className="flex flex-col items-center min-h-screen text-center p-4">
  <h2 className="text-3xl font-bold mb-16 text-center">Features</h2>
  <div className="flex flex-wrap justify-center gap-8">
    <div className="flex flex-col items-center text-center bg-slate-90 dark:bg-gray-900 shadow-md rounded-lg p-6 w-80 h-75 hover:shadow-lg transition-shadow duration-300">
      <svg
        className="w-12 h-12 text-green-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    </div>
    <div className="flex flex-col items-center text-center bg-slate-90 dark:bg-gray-900 shadow-md rounded-lg p-6 w-80 h-75 hover:shadow-lg transition-shadow duration-300">
      <svg
        className="w-12 h-12 text-green-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    </div>
    <div className="flex flex-col items-center text-center bg-slate-90 dark:bg-gray-900 shadow-md rounded-lg p-6 w-80 h-75 hover:shadow-lg transition-shadow duration-300">
      <svg
        className="w-12 h-12 text-green-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
    </div>
    <div className="flex flex-col items-center text-center bg-slate-90 dark:bg-gray-900 shadow-md rounded-lg p-6 w-80 h-75 hover:shadow-lg transition-shadow duration-300">
      <svg
        className="w-12 h-12 text-green-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M8 4v16M16 4v16" />
      </svg>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        AI Generated Flashcards
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Create customized flashcards with AI-generated content.
      </p>
    </div>
    <div className="flex flex-col items-center text-center bg-slate-90 dark:bg-gray-900 shadow-md rounded-lg p-6 w-80 h-75 hover:shadow-lg transition-shadow duration-300">
      <svg
        className="w-12 h-12 text-green-500 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16v16H4z" />
        <path d="M8 4v16M16 4v16" />
      </svg>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Notes-to-Flashcards
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Effortlessly convert your notes into flashcards to streamline your study sessions.
      </p>
    </div>

  </div>
</div>
      

      {/* Pricing section */}
      <div
        id="pricing"
        className="flex flex-col items-center min-h-screen text-center p-4"
      >
        <h2 className="text-3xl font-bold mb-16 text-center">Pricing</h2>
        <p className="text-lg mb-8 max-w-lg">
          Choose from our budget-friendly plans that offer great value while
          catering to your learning needs. Whether you need basic features or
          advanced tools, we have a plan to fit your requirements.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <div className="flex-1 max-w-md flex flex-col items-center bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-8 w-[400px] text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Basic Version
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">
              $7/month
            </p>
            <ul className="text-gray-600 dark:text-gray-300 mb-6">
              <li>Access to basic features</li>
              <li>Limited storage</li>
              <li>Basic support</li>
            </ul>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Get Started
            </Button>
          </div>
          <div className="flex-1 max-w-md flex flex-col items-center bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-8 w-[400px] text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Pro Version
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">
              $10/month
            </p>
            <ul className="text-gray-600 dark:text-gray-300 mb-6">
              <li>All features from Basic Version</li>
              <li>Unlimited storage</li>
              <li>Priority support</li>
            </ul>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
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
