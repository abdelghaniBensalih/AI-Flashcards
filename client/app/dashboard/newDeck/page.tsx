"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  return (
    <div>
      {" "}
      <div className="flex flex-row items-center justify-between">
        <Link href="/dashboard">
          <Button variant="outline" className="">
            <ChevronLeft />
          </Button>
        </Link>{" "}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          New Deck
        </h1>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  );
}
