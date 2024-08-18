"use client";

import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckAccountPage() {
  const [exists, setExists] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Fetch the user's account status
      fetch("/api/checkUserInsideDatabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          setExists(data.exists);

          if (!exists) {
            await fetch("/api/deleteUserFromClerk", {
              method: "POST",
              body: JSON.stringify({ userId: user.id }),
            });
          }
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-10 justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Check Account
      </h1>
      <div className="mx-auto">
        {exists ? (
          "Account exists"
        ) : (
          <>
            <p>Account does not exist, please pay before trying to log in</p>
            <Link href={"/#pricing"} className="flex justify-center mt-4">
              <Button>Payments page</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
