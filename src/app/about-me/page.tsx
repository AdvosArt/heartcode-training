import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image";
import Pfp from "@/app/assets/pfp9_1024.png"

export default function Home() {
  return (
    <div className="flex-row ml-auto mr-auto w-3/5">
      <Card>
        <CardHeader>
            <CardTitle>Hi, I am Gordon!</CardTitle>
            <CardDescription>Welcome to my page</CardDescription>
        </CardHeader>

        <CardContent>
            <Image src={Pfp} alt="Profile Picture" width={200} className="rounded-full ml-auto mr-auto"/>
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
              Follow me on:&nbsp;<a href="https://x.com/AdvosArt">Twitter</a>/<a href="https://www.instagram.com/advosart/">Instagram</a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}