"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Card, Deck } from "@/lib/interfaces/interfaces";
import { useEffect, useState } from "react";

export default function Page() {
  const deckName = useParams().deck;
  const { user } = useUser();
  const userId = user?.id as string;

  const [deck, setCards] = useState<Deck>();

  useEffect(() => {
    if (userId) {
      fetch("/api/getDeck", {
        body: JSON.stringify({ userId: userId, deckName: deckName }),
        method: "POST",
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((data: Deck) => setCards(data));
    }
  }, [userId]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <Link href="/dashboard">
          <Button variant="outline" className="">
            <ChevronLeft />
          </Button>
        </Link>{" "}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          {deckName}
        </h1>
        <div>
          <UserButton />
        </div>
      </div>
      <div>
        {deck &&
          deck.cards.map((card, index) => {
            return (
              <div key={index}>
                <h1>{card.front}</h1>
                <h2>{card.back}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}
