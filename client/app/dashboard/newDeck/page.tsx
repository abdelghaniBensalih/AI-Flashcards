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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Import Shadcn Alert components
import { ModeToggle } from "@/components/mode-toggle";

export default function Page() {
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState<File>();
  const [deck, setDeck] = useState<Deck>();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const alertRef = useRef<HTMLDivElement>(null); // Reference for the alert box
  const { user } = useUser();

  const generateDeckFromText = (userDescription: string) => {
    fetch("/api/generateDeckFromText", {
      method: "POST",
      body: JSON.stringify({ userDescription }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
      });
  };

  const handleSubmit = async () => {
    if (description === "" && !pdf) {
      setAlertMessage("Please enter a description or upload an image.");
      setAlertVisible(true);
      return;
    } else if (description !== "" && pdf) {
      setAlertMessage(
        "Please enter either a description or upload an image, not both."
      );
      setAlertVisible(true);
      return;
    } else if (description !== "") {
      generateDeckFromText(description);
    } else {
      const formData = new FormData();
      formData.append("image", pdf as Blob);
      fetch("/api/generateDeckFromImage", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // generateDeckFromText(
          //   `This is XML data, IGNORE THE XML TAGS, only look at the text within them: ${data[0]}`
          // );
        });
    }
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        alertRef.current &&
        !alertRef.current.contains(event.target as Node)
      ) {
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
        <div className="flex space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
          <Label htmlFor="description">Deck Description 💬</Label>
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
          <h3>Or...</h3>
          <Label htmlFor="image">Image of your notes 📷</Label>
          <Input
            placeholder="Create a deck about planets..."
            id="image"
            type="file"
            accept="application/pdf"
            onChange={(e) => {}}
          />
          <Button
            className="justify-self-end w-full"
            onClick={() => handleSubmit()}
          >
            Generate!
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-wrap gap-4 justify-center">
          {deck &&
            deck.cards.map((card, index) => (
              <div className="flip-card" key={index}>
                <div className="flip-card-inner">
                  <Card className="size-60 flex items-center justify-center hover:hidden flip-card-front">
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
                      {card.front}
                    </h2>
                  </Card>
                  <Card className="size-60 flex items-center justify-center absolute flip-card-back p-4">
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 text-center">
                      {card.back}
                    </h2>
                  </Card>
                </div>
              </div>
            ))}
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
          <div ref={alertRef} className="w-full max-w-sm p-4">
            <Alert variant="default">
              <AlertTitle>{alertMessage}</AlertTitle>
              <AlertDescription>
                <Button className="mt-4 w-full" onClick={handleCloseAlert}>
                  Close
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
}
