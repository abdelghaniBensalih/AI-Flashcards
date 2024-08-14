import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SignIn,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">
        <Button>Get to coding</Button>
      </Link>
      <ModeToggle />
      <SignedOut>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignOutButton />
    </div>
  );
}
