
"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { createDeck } from "@/lib/firebase/crud";
import { Deck } from "@/lib/interfaces/interfaces";
import { Card } from "@/components/ui/card";

export default function Page() {
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState<Deck>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertRef = useRef<HTMLDivElement>(null); // Reference for the alert box

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
    try {
      await createDeck({ userId: user?.id as string, newDeck: deck as Deck });
      setAlertMessage("Deck saved successfully!");
      setAlertVisible(true);
    } catch (error) {
      setAlertMessage("Failed to save the deck.");
      setAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  // Close the alert if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
        handleCloseAlert();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="grid gap-10">
      <div className="flex flex-row items-center justify-between">
        <Link href="/dashboard">
          <Button variant="outline">
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          New Deck
        </h1>
        <div>
          <UserButton />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
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
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {deck &&
            deck.cards.map((card, index) => {
              return (
                <div className="flip-card" key={index}>
                  <div className="flip-card-inner">
                    <Card
                      className="size-60 flex items-center justify-center hover:hidden flip-card-front"
                    >
                      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
                        {card.front}
                      </h2>
                    </Card>
                    <Card
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
        </div>
        {deck && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => handleNewDeckCreation()}>Save Deck</Button>
          </div>
        )}
      </div>

      {/* Alert */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={alertRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto"
          >
            <p>{alertMessage}</p>
            <Button className="mt-4 w-full" onClick={handleCloseAlert}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
