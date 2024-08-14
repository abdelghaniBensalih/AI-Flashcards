
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
      <div className="h-screen flex items-center justify-center">
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
    </div>
  );
}
