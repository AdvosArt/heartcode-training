//import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FlipWords } from "@/components/ui/flip-words";
import { Separator } from "@/components/ui/separator";
import { PiHandSwipeRightBold } from "react-icons/pi";

export default function Home() {
  const words: string[] = [
    "Cocaine", "Angel Power", 
    "Crack", 
    "Fentanyl", "Fent", 
    "Heroin", "Diamorphine",
    "Ketamine", 
    "LSD", "Acid", 
    "Marijuana", "Ganja", "Weed", "420", "Spice", "K2",
    "MDMA", "Bath Salts", 
    "Methamphetamine", "Meth", "Crystal", "Glass (Meth)", 
    "Mushrooms", "Shrooms", 
    "Opium", 
    "PCP", 
    "Alchohol",
    "Opium", "Morphine",
    "Tabacco", "Nicotine", "Vapes"
  ]

  const shuffle = (array: string[]) => { 
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="bg-[url('/bg_image.jpg')] bg-cover bg-fixed bg-no-repeat bg-blend-screen dark:bg-blend-overlay dark:bg-black/75 bg-white/75">
      <Carousel>
      <CarouselContent>
      <CarouselItem>
      <div className="mx-auto w-4/5">
        <div className="flex flex-col justify-center h-dvh">
          <div className="font-bold text-5xl text-center mb-2">
            Say no to<FlipWords words={shuffle(words)} duration={1}/>
            </div>
          <p className="text-base text-center">Don't do drugs.</p>
          <div className="flex text-3xl justify-center mt-10">
            <PiHandSwipeRightBold />
            </div>
        </div>
      </div>
      </CarouselItem>

      <CarouselItem>
      <div className="ml-auto mr-auto w-4/5 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>What is Substance abuse?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex fex-row gap-2 mb-5">
              <p className="font-bold">
                From <a href="https://en.wikipedia.org/wiki/Substance_abuse" target="_blank" className="text-blue-700 dark:text-blue-400">Wikipedia</a>:
              </p>
            </div>

            <div className="flex fex-row gap-2 mb-5">
              <p>
              Substance abuse, also known as drug abuse, is <span className="font-bold">the use of a drug in amounts or by methods that are harmful to the individual or others</span>. It is a form of substance-related disorder. Differing definitions of drug abuse are used in public health, medical, and criminal justice contexts. In some cases, criminal or anti-social behavior occurs when the person is under the influence of a drug, and long-term personality changes in individuals may also occur. In addition to <span className="font-bold">possible physical, social, and psychological harm</span>, the use of some drugs may also lead to <span className="font-bold">criminal penalties</span>, although these vary widely depending on the local jurisdiction.
              </p>
            </div>

            <div className="flex fex-row gap-2 mb-5">
              <p>
              Drugs most often associated with this term include <span className="font-bold">alcohol, amphetamines, barbiturates, benzodiazepines, cannabis, cocaine, hallucinogens, methaqualone, and opioids</span>. The exact cause of substance abuse is not clear, but there are two predominant theories: either a genetic predisposition or a habit learned from others, which, <span className="font-bold">if addiction develops, manifests itself as a chronic debilitating disease</span>.
              </p>
            </div>

            <div className="flex fex-row gap-2 mb-5">
              <p>
              In 2010, about 5% of adults (230 million) used an illicit substance. Of these, 27 million have high-risk drug use—otherwise known as recurrent drug use—causing harm to their health, causing psychological problems, and or causing social problems that put them at risk of those dangers. In 2015, substance use disorders resulted in 307,400 deaths, up from 165,000 deaths in 1990. Of these, the highest numbers are from alcohol use disorders at 137,500, opioid use disorders at 122,100 deaths, amphetamine use disorders at 12,200 deaths, and cocaine use disorders at 11,100.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="flex text-3xl justify-center mt-10">
          <PiHandSwipeRightBold />
        </div>
      </div>
      </CarouselItem>

      <CarouselItem>
      <div className="flex flex-col justify-center h-dvh ml-auto mr-auto w-4/5">
      <Separator className="mb-10" />
        <div className="text-2xl text-center mb-10">
        What's the situation in Singapore? Here's <a href="https://www.cnb.gov.sg/docs/default-source/drug-situation-report-documents/cnb-annual-statistics-2023.pdf" target="_blank" className="text-blue-700 dark:text-blue-400">some statistics from 2023</a> from the CNB:
        </div>
        <div className="text-2xl text-center mb-10">
        In 2023, CNB arrested <span className="font-bold">3,122 drug abusers</span>, an <span className="font-bold">increase of 10%</span> from the 2,826 abusers arrested in 2022. 
        </div>
        <div className="text-2xl text-center mb-10">
        859 (28%) of all drug abusers arrested were <span className="font-bold">below 30 years old</span>. The number of youth abusers arrested (i.e., aged below 20 years old) <span className="font-bold">increased by 11%</span> to 132 in 2023 from 119 in 2022.
        </div>
        <div className="text-2xl text-center mb-10">
        <span className="font-bold">Methamphetamine, heroin, and cannabis</span> were the three most commonly abused drugs in 2023, with 94% of drug abusers arrested abusing at least one of these three drugs. 
        </div>
        <div className="text-2xl text-center mb-10 font-bold">
        Do not be part of the statistic! 
        </div>
        <Separator className="mb-10" />
      </div>
      </CarouselItem>

      </CarouselContent>
      </Carousel>

    </div>
  );
}
