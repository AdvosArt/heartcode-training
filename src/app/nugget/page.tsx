"use client"

import { useState } from "react";
import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  const [gifToggle, setGifToggle] = useState(false)

  function changeModel() {
    setGifToggle(!gifToggle)
  }

  return (
    <div className='bg-gradient-to-t from-[#FF6100]/25 dark:from-[#0094FF]/25 min-h-screen'>
      <div>
        <ThreeScene/>
      </div>
    </div>
  );
}