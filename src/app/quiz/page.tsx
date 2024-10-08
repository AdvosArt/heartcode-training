import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="ml-auto mr-auto w-4/5">
      <Card>
        <CardHeader>
          <CardTitle>Drug Abuse Quiz</CardTitle>
          <CardDescription>How much do you know about Drug Abuse?</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question 1:</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="w-[400px]">

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
