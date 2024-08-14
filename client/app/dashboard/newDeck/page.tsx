
// "use client";

// import { Button } from "@/components/ui/button";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { createDeck } from "@/lib/firebase/crud";
// import { Deck } from "@/lib/interfaces/interfaces";
// import { Card } from "@/components/ui/card";

// export default function Page() {
//   const [description, setDescription] = useState("");
//   const [deck, setDeck] = useState<Deck>();
//   const { user } = useUser();

//   const handleSubmit = async () => {
//     fetch("/api/generate", {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setDeck(data);
//       });
//   };

//   const handleNewDeckCreation = async () => {
//     await createDeck({ userId: user?.id as string, newDeck: deck as Deck });
//   };

//   return (
//     <div className="grid gap-10 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-row items-center justify-between p-4">
//         <Link href="/dashboard">
//           <Button variant="outline">
//             <ChevronLeft />
//           </Button>
//         </Link>
//         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
//           New Deck
//         </h1>
//         <div>
//           <UserButton />
//         </div>
//       </div>

//       {/* Deck Description and Generate Button */}
//       <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
//         <Label htmlFor="description">Deck Description</Label>
//         <Input
//           placeholder="Create a deck about planets..."
//           id="description"
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           onKeyUp={(e) => {
//             if (e.key === "Enter") handleSubmit();
//           }}
//         />
//         <Button
//           className="max-w-min"
//           onClick={() => handleSubmit()}
//         >
//           Generate!
//         </Button>
//       </div>

//       {/* Cards */}
//       <div className="w-full flex flex-wrap gap-4 justify-center">
//         {deck &&
//           deck.cards.map((card, index) => (
//             <div key={index} className="flip-card">
//               <div className="flip-card-inner">
//                 <Card
//                   className="size-60 flex items-center justify-center hover:hidden flip-card-front"
//                 >
//                   <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
//                     {card.front}
//                   </h2>
//                 </Card>
//                 <Card
//                   className="size-60 flex items-center justify-center absolute flip-card-back p-4"
//                 >
//                   <h2 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 text-center">
//                     {card.back}
//                   </h2>
//                 </Card>
//               </div>
//             </div>
//           ))}
//       </div>

//       {/* Save Deck Button */}
//       {deck && (
//         <div className="flex justify-center">
//           <Button onClick={() => handleNewDeckCreation()} className="w-full max-w-xs">
//             Save Deck
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { createDeck } from "@/lib/firebase/crud";
// import { Deck } from "@/lib/interfaces/interfaces";
// import { Card } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


// export default function Page() {
//   const [description, setDescription] = useState("");
//   const [deck, setDeck] = useState<Deck>();
//   const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
//   const [alertMessage, setAlertMessage] = useState(""); // State for alert message
//   const { user } = useUser();

//   const handleSubmit = async () => {
//     fetch("/api/generate", {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setDeck(data);
//       });
//   };

//   const handleNewDeckCreation = async () => {
//     try {
//       await createDeck({ userId: user?.id as string, newDeck: deck as Deck });
//       setAlertMessage("Deck saved successfully!"); // Set success message
//       setAlertVisible(true); // Show alert
//     } catch (error) {
//       setAlertMessage("Failed to save the deck."); // Set error message
//       setAlertVisible(true); // Show alert
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlertVisible(false);
//   };

//   return (
//     <div className="grid gap-10">
//       <div className="flex flex-row items-center justify-between">
//         <Link href="/dashboard">
//           <Button variant="outline" className="">
//             <ChevronLeft />
//           </Button>
//         </Link>
//         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
//           New Deck
//         </h1>
//         <div>
//           <UserButton />
//         </div>
//       </div>
//       <div>
//         <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
//           <Label htmlFor="description">Deck Description</Label>
//           <Input
//             placeholder="Create a deck about planets..."
//             id="description"
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             onKeyUp={(e) => {
//               if (e.key === "Enter") handleSubmit();
//             }}
//           />
//           <Button
//             className="max-w-min justify-self-end"
//             onClick={() => handleSubmit()}
//           >
//             Generate!
//           </Button>
//         </div>
//       </div>
//       <div className="w-full flex flex-wrap gap-4 justify-center">
//         {deck &&
//           deck.cards.map((card, index) => {
//             return (
//               <div className="flip-card" key={index}>
//                 <div className="flip-card-inner">
//                   <Card
//                     className="size-60 flex items-center justify-center hover:hidden flip-card-front"
//                   >
//                     <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
//                       {card.front}
//                     </h2>
//                   </Card>
//                   <Card
//                     className="size-60 flex items-center justify-center absolute flip-card-back p-4"
//                   >
//                     <h2 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 text-center">
//                       {card.back}
//                     </h2>
//                   </Card>
//                 </div>
//               </div>
//             );
//           })}
//         {deck && (
//           <Button onClick={() => handleNewDeckCreation()}>Save Deck</Button>
//         )}
//       </div>
//       {/* Shadcn Alert component */}
//       {alertVisible && (
//         <Alert
//           onClose={handleCloseAlert}
//           className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
//         >
//           {alertMessage}
//         </Alert>
//       )}
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { ChevronLeft } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { createDeck } from "@/lib/firebase/crud";
// import { Deck } from "@/lib/interfaces/interfaces";
// import { Card } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export default function Page() {
//   const [description, setDescription] = useState("");
//   const [deck, setDeck] = useState<Deck>();
//   const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
//   const [alertMessage, setAlertMessage] = useState(""); // State for alert message
//   const { user } = useUser();

//   const handleSubmit = async () => {
//     fetch("/api/generate", {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setDeck(data);
//       });
//   };

//   const handleNewDeckCreation = async () => {
//     try {
//       await createDeck({ userId: user?.id as string, newDeck: deck as Deck });
//       setAlertMessage("Deck saved successfully!"); // Set success message
//       setAlertVisible(true); // Show alert
//     } catch (error) {
//       setAlertMessage("Failed to save the deck."); // Set error message
//       setAlertVisible(true); // Show alert
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlertVisible(false);
//   };

//   return (
//     <div className="grid gap-10">
//       <div className="flex flex-row items-center justify-between">
//         <Link href="/dashboard">
//           <Button variant="outline" className="">
//             <ChevronLeft />
//           </Button>
//         </Link>
//         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
//           New Deck
//         </h1>
//         <div>
//           <UserButton />
//         </div>
//       </div>
//       <div>
//         <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
//           <Label htmlFor="description">Deck Description</Label>
//           <Input
//             placeholder="Create a deck about planets..."
//             id="description"
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             onKeyUp={(e) => {
//               if (e.key === "Enter") handleSubmit();
//             }}
//           />
//           <Button
//             className="max-w-min justify-self-end"
//             onClick={() => handleSubmit()}
//           >
//             Generate!
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-center">
//         <div className="w-full flex flex-wrap gap-4 justify-center">
//           {deck &&
//             deck.cards.map((card, index) => {
//               return (
//                 <div className="flip-card" key={index}>
//                   <div className="flip-card-inner">
//                     <Card
//                       className="size-60 flex items-center justify-center hover:hidden flip-card-front"
//                     >
//                       <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 text-center">
//                         {card.front}
//                       </h2>
//                     </Card>
//                     <Card
//                       className="size-60 flex items-center justify-center absolute flip-card-back p-4"
//                     >
//                       <h2 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 text-center">
//                         {card.back}
//                       </h2>
//                     </Card>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//         {deck && (
//           <div className="flex justify-center mt-4">
//             <Button onClick={() => handleNewDeckCreation()}>Save Deck</Button>
//           </div>
//         )}
//       </div>
//       {/* Shadcn Alert component */}
//       {alertVisible && (
//         <Alert
//           onClose={handleCloseAlert}
//           className="fixed bottom-4 left-1/2 transform -translate-x-1/2"
//         >
//           {alertMessage}
//         </Alert>
//       )}
//     </div>
//   );
// }




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
