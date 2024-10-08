import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
