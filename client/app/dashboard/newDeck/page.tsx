"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createDeck } from "@/lib/firebase/crud";
import { Deck } from "@/lib/interfaces/interfaces";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState<Deck>();
  const { user } = useUser();

  const handleSubmit = async () => {
    fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
      });
  };

  const handleNewDeckCreation = async () => {
    await createDeck({ userId: user?.id as string, newDeck: deck as Deck });
  };

  return (
    <div className="grid gap-10">
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
      <div>
        <div className="grid gap-2 w-96">
          <Label htmlFor="description">Deck Description</Label>
          <Input
            placeholder="Create a deck about planets..."
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <Button
            className="max-w-min justify-self-end"
            onClick={() => handleSubmit()}
          >
            Generate!
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {deck &&
          deck.cards.map((card, index) => {
            return (
              <div className="flip-card">
                <div className="flip-card-inner">
                  <Card
                    key={index}
                    className="size-60 flex items-center justify-center hover:hidden flip-card-front"
                  >
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
                      {card.front}
                    </h2>
                  </Card>
                  <Card
                    key={index}
                    className="size-60 flex items-center justify-center absolute flip-card-back p-4"
                  >
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 text-center">
                      {card.back}
                    </h2>
                  </Card>
                </div>
              </div>
            );
          })}
        {deck && (
          <Button onClick={() => handleNewDeckCreation()}>Save Deck</Button>
        )}
      </div>
    </div>
  );
}
