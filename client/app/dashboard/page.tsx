"use client";

import { Button } from "@/components/ui/button";
import { createDeck, deleteDeck, getDecks } from "@/lib/firebase/crud";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Deck } from "@/lib/interfaces/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>();

  const { user } = useUser();
  const userId = user?.id as string;

  useEffect(() => {
    if (userId) {
      getDecks(userId, setDecks);
    }
  }, [userId]);

  return (
    <div className="grid gap-10">
      {" "}
      <div className="flex flex-row items-center justify-between">
        <Link href="/">
          <Button variant="outline" className="">
            <ChevronLeft />
          </Button>
        </Link>{" "}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Your Cards
        </h1>
        <div className="flex space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
      <Link href="/dashboard/newDeck" className="mx-auto">
        <Button className="max-w-min mx-auto">Create a new deck</Button>
      </Link>
      <div className="grid grid-cols-3 gap-4">
        {decks &&
          decks.map((deck, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{deck.name}</CardTitle>
                  <CardDescription className="font-semibold">
                    Number of cards: {deck.cards.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {deck.description}
                  </p>
                </CardContent>
                <CardFooter className="w-full flex flex-col">
                  <Link
                    href={`/dashboard/${deck.name.replace(" ", "-")}`}
                    className="w-full"
                  >
                    <Button className="w-full">Study Now</Button>
                  </Link>
                  <Button
                    className="w-full mt-2"
                    onClick={() =>
                      deleteDeck(userId, deck.name).then(() =>
                        getDecks(userId, setDecks)
                      )
                    }
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
