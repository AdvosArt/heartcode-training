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
import { z } from "zod"
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';


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
  // const quiz = [
  //   {text:'Qn1',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'2'},
  //   {text:'Qn2',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'3'},
  //   {text:'Qn3',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'4'},
  //   {text:'Qn4',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'1'},
  // ];
  const quiz = [
    {text:'Which one of these is NOT a commonly used recrational drug?',options:['Methamphetamine','Ketamine','Fentanyl','Paracetamol',],answer:'4'},
    {text:'For how long can cocaine be detected in a standard urine test?',options:['1 week','1 month','4 to 5 days','27 days'],answer:'3'},
    {text:"Once you start injecting drugs it's impossible to stop using drugs.",options:['True', 'False'],answer:'2'},
    {text:'Which of the following is NOT a long term effect from cannabis?',options:['Feeling permanently relaxed','Reduced Motivation','Frequent illness','Change in hormones'],answer:'1'},
    {text:'Penalties for the possesion or consumption of Cannabis in Singapore are:',options:['Up to 10 years imprisonment', 'S$20,000 fine', 'All of the above'],answer:'3'},
    {text:'Heroin is made from the poppy plant.',options:['True', 'False'],answer:'1'},
    {text:'Death from ecstasy (MDMA) use can be caused by the body overheating and by dehydration.',options:['True','False'],answer:'1'},
    {text:'Penalties for the possesion or consumption of Cannabis in Singapore are:',options:['Whatsapp', 'Wechat', 'Telegram' ,"Discord"],answer:'3'},
    {text:'Drinking black coffee does not help a person sober up after drinking alcohol.',options:['True','False'],answer:'1'},
    {text:'Users of this drug use a pacifier after taking it to keep them from grinding their teeth.',options:['Heroin','MDMA','Meth','All of the above'],answer:'2'},
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
    form.reset()
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
        {!quizDone && quiz.map((questionText, i) => {
              if((i + 1) == question){
                return (
                  
          <Card>
            <CardHeader>
              <Progress className="mb-2" value={question/quiz.length * 100}></Progress>
              <CardTitle>Question {question} / {quiz.length}:</CardTitle>
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
                        <TextGenerateEffect words={questionText["text"]} duration={0.5}/>
                        {/* {questionText["text"]} */}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {questionText["options"].map((option, j) => {
                            return (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={(j+1).toString()} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {/* <TextGenerateEffect words={option} duration={1} /> */}
                                  {option}
                                </FormLabel>
                              </FormItem>
                            )})}

                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  
                  />
                  <div className='flex justify-center'>
                    {isSubmitted ? <Button onClick={()=>nextQuestion()}>Next</Button>:<Button onClick={() => setAnswer(questionText)}>Submit</Button>}
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
                  <TypewriterEffect words={[{text: "Exellent"}, {text: "Job!"}]} />
                </div>
                }

              {score < quiz.length && score > quiz.length/2 && 
                <div>
                  <TypewriterEffect words={[{text: "Good"}, {text: "Job!"}]} />
                </div>
                }

              {score <= quiz.length/2 && score > 0 && 
                <div>
                  <TypewriterEffect words={[{text: "Nice"}, {text: "Try."}]} />
                </div>
                }

              {score==0 && 
                <div>
                  <TypewriterEffect words={[{text: "Do"}, {text: "Better."}]} />
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
