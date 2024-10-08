"use client"

import React,{useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const FormSchema = z.object({
  answer: z.enum(["1", "2", "3", "4"], {
    required_error: "Please select an answer.",
  }),
})


export default function Home() {
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(1)
  const [quizDone, setQuizDone] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const quiz = [
    {text:'Qn1',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'2'},
    {text:'Qn2',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'3'},
    {text:'Qn3',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'4'},
    {text:'Qn4',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'1'},
  ];


  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitted(true)
    if(data["answer"] == currentAnswer) {
      console.log(data["answer"]);
      setIsCorrect(true);
      setScore(score + 1)
    }
  }

  function setAnswer(x: any) {
    setCurrentAnswer(x['answer'])
  }

  function nextQuestion() {
    setQuestion(question + 1)
    setIsCorrect(false)
    setIsSubmitted(false)

    if(question == quiz.length) {
      setQuizDone(true)
    }
  }


  return (
    <div className="ml-auto mr-auto w-4/5">
      <Card>
        <CardHeader>
          <CardTitle>Drug Abuse Quiz</CardTitle>
          <CardDescription>How much do you know about Drug Abuse?</CardDescription>
        </CardHeader>
        <CardContent>

        <div className="ml-auto mr-auto w-3/5">
        {!quizDone && quiz.map((x, i) => {
              if((i + 1) == question){
                return (
                  
          <Card>
            <CardHeader>
              <CardTitle>Question {question}:</CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        {x["text"]}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {x["options"][0]}
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {x["options"][1]}
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel className="font-normal">
                             {x["options"][2]}
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="4" />
                            </FormControl>
                            <FormLabel className="font-normal">
                             {x["options"][3]}
                            </FormLabel>
                          </FormItem>

                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                  <div className='flex justify-center'>
                    {isSubmitted ? <Button onClick={()=>nextQuestion()}>Next</Button>:<Button onClick={() => setAnswer(x)}>Submit</Button>}
                  </div>
                </form>
              </Form>


              {(isSubmitted && isCorrect) && 
                <Alert>
                  <AlertTitle>Correct</AlertTitle>
                </Alert>
              }

              {(isSubmitted && !isCorrect) && 
                <Alert>
                  <AlertTitle>Wrong</AlertTitle>
                </Alert>
              }

            </CardContent>
          </Card>
            )}
          })}

          
          {quizDone && 
            <Card>
              <CardHeader>
                <CardTitle>You scored {score}/{quiz.length}</CardTitle>
              </CardHeader>
              <CardContent>
                {score==quiz.length && 
                <div>
                  Full Marks!
                </div>
                }

              {score < quiz.length && score != 0 && 
                <div>
                  Nice Try!
                </div>
                }

              {score==0 && 
                <div>
                  Do better.
                </div>
                }
              </CardContent>
            </Card>
          }
          </div>
        </CardContent>
      </Card>


    </div>

    
  );
}
