"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function CheckAccountPage() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch("api/addUserToDatabase", {
        method: "POST",
        body: JSON.stringify({ userId: user.id }),
      }).then(() => {
        console.log("done");
      });
    }
  }, [user]);

  return <div>test</div>;
}
