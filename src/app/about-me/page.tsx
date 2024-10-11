"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import Pfp from "@/app/assets/pfp9_1024.png"
import Nugget from "@/app/assets/nuggetRender_64.gif"
import McSpicy from "@/app/assets/mcspicyRender_64.gif"
import { useState } from "react";

export default function Home() {
  const [gifToggle, setGifToggle] = useState(false)

  function changeGif() {
    setGifToggle(!gifToggle)
  }

  return (
    <div className='bg-gradient-to-t from-[#FF6100]/25 dark:from-[#0094FF]/25 min-h-screen'>
    <div className="flex-row mx-auto w-96">
      <Card>
        <CardHeader>
            <CardTitle className="flex justify-center">Hi, I am Gordon!</CardTitle>
            <CardDescription className="flex justify-center">Welcome to my page</CardDescription>
        </CardHeader>

        <CardContent>
            <Image src={Pfp} alt="Profile Picture" width={200} className="rounded-full mx-auto mb-5"/>
            <div className="flex flex-row gap-2">
              <p className="font-bold">Name:</p>
              Gordon
            </div>

            <div className="flex flex-row gap-2">
              <p className="font-bold">Major:</p>
              Software Engineering
            </div>

            <div className="flex flex-row gap-2 mb-10">
              <p className="font-bold">Hobbies:</p>
              Playing the Piano, <br />
              Drawing/Animating, <br />
              Playing Video Games
            </div>

            <div className="flex justify-end">
              Follow me on:&nbsp;<a href="https://x.com/AdvosArt" target="_blank" className="text-blue-700 dark:text-blue-400">Twitter</a>/<a href="https://www.instagram.com/advosart/" target="_blank" className="text-blue-700 dark:text-blue-400">Instagram</a>
            </div>
        </CardContent>
      </Card>
    </div>

    {!gifToggle &&
    <Image style={{cursor: "pointer"}} onClick={()=>changeGif()} src={Nugget} unoptimized={true} alt="Nugget" width={64} className="mx-auto mt-48"/>
    }
    
    {gifToggle &&
    <Image style={{cursor: "pointer"}} onClick={()=>changeGif()} src={McSpicy} unoptimized={true} alt="Nugget" width={64} className="mx-auto mt-48"/>
    }

    </div>
  );
}