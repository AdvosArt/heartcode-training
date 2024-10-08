//import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="ml-auto mr-auto w-5/5">
      
      <div className="flex flex-col justify-center h-dvh">
        <p className="font-bold text-5xl text-center mb-2">Do drugs</p>
        <p className="text-sm text-center">It's all really good ong</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>What is drug abuse?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex fex-row gap-2 mb-5">
            <p className="font-bold">
              From <a href="https://en.wikipedia.org/wiki/Substance_abuse" className="text-blue-500">Wikipedia</a>:
            </p>
          </div>

          <div className="flex fex-row gap-2 mb-5">
            <p>
            Substance abuse, also known as drug abuse, is the use of a drug in amounts or by methods that are harmful to the individual or others. It is a form of substance-related disorder. Differing definitions of drug abuse are used in public health, medical, and criminal justice contexts. In some cases, criminal or anti-social behavior occurs when the person is under the influence of a drug, and long-term personality changes in individuals may also occur. In addition to possible physical, social, and psychological harm, the use of some drugs may also lead to criminal penalties, although these vary widely depending on the local jurisdiction.
            </p>
          </div>

          <div className="flex fex-row gap-2 mb-5">
            <p>
            Drugs most often associated with this term include alcohol, amphetamines, barbiturates, benzodiazepines, cannabis, cocaine, hallucinogens, methaqualone, and opioids. The exact cause of substance abuse is not clear, but there are two predominant theories: either a genetic predisposition or a habit learned from others, which, if addiction develops, manifests itself as a chronic debilitating disease.
            </p>
          </div>

          <div className="flex fex-row gap-2 mb-5">
            <p>
            In 2010, about 5% of adults (230 million) used an illicit substance. Of these, 27 million have high-risk drug use—otherwise known as recurrent drug use—causing harm to their health, causing psychological problems, and or causing social problems that put them at risk of those dangers. In 2015, substance use disorders resulted in 307,400 deaths, up from 165,000 deaths in 1990. Of these, the highest numbers are from alcohol use disorders at 137,500, opioid use disorders at 122,100 deaths, amphetamine use disorders at 12,200 deaths, and cocaine use disorders at 11,100.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
