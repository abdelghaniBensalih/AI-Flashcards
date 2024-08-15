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

//----------stripe import-----
import { loadStripe } from "@stripe/stripe-js";
//--------------------------

export default function Home() {
  return (
    <div className="relative min-h-screen p-4">
      {/* Top-left logo and title */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
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
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <ModeToggle />
        <SignedIn>
          <UserButton />
          <SignOutButton />
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

      {/* Centered content */}
      <div className="my-12 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            FlashFlorte
          </h1>
          <p className="text-lg mb-8 max-w-lg">
            Discover a smarter way to study with FlashFlorte. Create, manage, and review your flashcards effortlessly to boost your learning and retention. Get started now and turn your study sessions into productive adventures!
          </p>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="mb-4">View My Decks</Button>
            </Link>
          </SignedIn>
        </div>
      </div>
      
      {/* Features section */}
      <div className="mt-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
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
            <h3 className="text-xl font-semibold mb-2">Create Flashcards</h3>
            <p className="text-gray-600">
              Easily create your own flashcards with our intuitive interface.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
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
            <h3 className="text-xl font-semibold mb-2">Manage Decks</h3>
            <p className="text-gray-600">
              Organize and manage your flashcard decks with ease.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
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
            <h3 className="text-xl font-semibold mb-2">Review Flashcards</h3>
            <p className="text-gray-600">
              Review your flashcards to reinforce your learning and retention.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="mt-16 px-4">
  <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Basic</h3>
      <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">$5/month</p>
      <ul className="text-gray-600 dark:text-gray-300 mb-6">
        <li>Access to basic features</li>
        <li>Limited storage</li>
        <li>Basic support</li>
      </ul>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        Get Started
      </button>
    </div>
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Pro</h3>
      <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">$10/month</p>
      <ul className="text-gray-600 dark:text-gray-300 mb-6">
        <li>Access to all features</li>
        <li>Unlimited flashcards</li>
        <li>Premium support</li>
      </ul>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        Choose Pro
      </button>
    </div>
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Enterprise</h3>
      <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">Contact us for pricing</p>
      <ul className="text-gray-600 dark:text-gray-300 mb-6">
        <li>Access to all features</li>
        <li>Unlimited flashcards</li>
        <li>Premium support</li>
        <li>Advanced analytics</li>
        <li>Custom branding</li>
      </ul>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
        Contact Us
      </button>
    </div>
  </div>
</div>

    </div>
  );
}
