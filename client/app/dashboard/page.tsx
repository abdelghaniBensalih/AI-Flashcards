"use client";

import { Button } from "@/components/ui/button";
import { createDeck, deleteDeck, getDecks } from "@/lib/firebase/crud";
import Link from "next/link";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>();

  useEffect(() => {
    getDecks("", setDecks);
  }, []);

  return (
    <div className="relative min-h-screen p-4">
      {/* Header Section */}
      <div className="absolute top-4 left-4 flex items-center space-x-4 z-10">
        <Link href="/">
          <Button variant="outline">
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-3 space-x-4 z-10">
        {" "}
        <Dialog>
          <DialogTrigger className="underline">Contact Us</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
              <DialogDescription>
                If you have any questions or concerns, please reach out to us:
                <ul className="list-disc ml-6">
                  <li>
                    <span className="font-bold">Email:</span>{" "}
                    <Link
                      href="mailto:jinayunity22@gmail.com"
                      className="underline"
                    >
                      Jinay
                    </Link>
                    ,
                    <Link
                      href="mailto:nebilawako@gmail.com"
                      className="underline ml-1"
                    >
                      Nebila
                    </Link>
                    ,
                    <Link
                      href="mailto:abdelghanibesalih@gmail.com"
                      className="underline ml-1"
                    >
                      Abdelghani
                    </Link>
                   
                  </li>
                  <li>
                    <span className="font-bold">LinkedIn:</span>{" "}
                    <Link
                      href="https://www.linkedin.com/in/jinay-patel-6369002b4/"
                      className="underline"
                    >
                      Jinay Patel
                    </Link>
                    ,
                    <Link
                      href="https://www.linkedin.com/in/nebila-wako-b61632289/"
                      className="underline ml-1"
                    >
                      Nebila Wako
                    </Link>
                    ,

                    <Link
                      href="https://www.linkedin.com/in/abdelghani-bensalih-469155219/"
                      className="underline ml-1"
                    >
                      Abdelghani Bensalih
                    </Link>
                  </li>
                
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <ModeToggle />
      </div>

      <div className="flex flex-col items-center justify-center h-full pt-12">
        <h1 className="scroll-m-20 text-3xl lg:text-4xl font-extrabold tracking-tight text-center">
          Your Cards
        </h1>
        <Link href="/dashboard/newDeck" className="mx-auto mt-4">
          <Button className="max-w-min mx-auto" variant={"success"}>Create a new deck</Button>
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {decks ? (
            decks.map((deck, index) => (
              <Card key={index} className="w-full">
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
                    href={`/dashboard/${deck.name.replaceAll(" ", "-")}`}
                    className="w-full"
                  >
                    <Button className="w-full">Study Now</Button>
                  </Link>
                  <Button
                    className="w-full mt-2"
                    onClick={() =>
                      deleteDeck("", deck.name).then(() =>
                        getDecks("", setDecks)
                      )
                    }
                    variant={"destructive"}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Skeleton className="w-full" />
          )}
        </div>
      </div>
    </div>
  );
}
