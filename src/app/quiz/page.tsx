import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function Home() {
  return (
    <div className="ml-auto mr-auto w-4/5">
      <Card>
        <CardHeader>
          <CardTitle>Drug Abuse Quiz</CardTitle>
          <CardDescription>How much do you know about Drug Abuse?</CardDescription>
        </CardHeader>
        <CardContent>

        <div className="ml-auto mr-auto w-3/5">
          <Card>
            <CardHeader>
              <CardTitle>Question 1:</CardTitle>
            </CardHeader>

            <CardContent>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quis.
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
              </div>
            </CardContent>
          </Card>
          </div>

        </CardContent>
      </Card>

      
    </div>
  );
}
