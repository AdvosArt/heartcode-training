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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';


const FormSchema = z.object({
  answer: z.enum(["1", "2", "3", "4"], { // Add more options here
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
  //   {text:'Qn1',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'2',explanation:'Ex'},
  //   {text:'Qn2',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'3',explanation:'Ex'},
  //   {text:'Qn3',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'4',explanation:'Ex'},
  //   {text:'Qn4',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'1',explanation:'Ex'},
  // ];
  const quiz = [
    {text:'Which one of these is NOT a commonly used recrational drug?',
      options:['Methamphetamine','Ketamine','Fentanyl','Paracetamol',],
      answer:'4',
      explanation: 'Paracetamol is a common pailkiller drug. While still dangerous to overdose on, it is not a common recreational drug.'},
    {text:'For how long can cocaine be detected in a standard urine test?',
      options:['48 hours','4 to 5 days','27 days','90 days'],
      answer:'2',
      explanation: 'Cocaine stays in urine for up to 4 to 5 days, in Blood and Saliva for up to 48 hours, and in hair follicles for up to 90 days.'},
    {text:"Once you start injecting drugs it's impossible to stop using drugs.",
      options:['True', 'False'],
      answer:'2',
      explanation: 'Although it is very difficult, it is possible to stop taking drugs with enough help like rehabilitaion and therapy.'},
    {text:'Which of the following is NOT a long term effect from cannabis?',
      options:['Feeling permanently relaxed','Reduced Motivation','Frequent illness','Change in hormones'],
      answer:'1',
      explanation: 'Long term cannabis use can affect motivation, hormones and general health but does not cause a permanent feeling of relaxation.'},
    {text:'Penalties for the possesion or consumption of Cannabis in Singapore are:',
      options:['Up to 10 years imprisonment', 'S$20,000 fine', 'All of the above'],
      answer:'3',
      explanation: 'Penalties for the possesion or consumption of drugs of any kind in Singapore are up to 10 years imprisonment and a S$20,000 fine.'},
    {text:'Heroin is made from the poppy plant.',
      options:['True', 'False'],
      answer:'1',
      explanation: 'The poppy plant, Papaver somniferum, produces opium, a powerful narcotic whose derivatives include morphine, codeine, heroin, and oxycodone.'},
    {text:'Death from ecstasy (MDMA) use can be caused by the body overheating and by dehydration.',
      options:['True','False'],
      answer:'1',
      explanation: 'Symptoms of Ecstacy Overdose include abnormal heart rates, body temperature dysregulation, hyperthermia, and seizures.'},
    {text:'The most common channel of communication for drug dealers online is:',
      options:['Whatsapp', 'Wechat', 'Telegram' ,"Discord"],
      answer:'3',
      explanation: 'Telegram is known for its two layers of secure encryption, so it is the go-to choice for drug dealers.'},
    {text:'Alcohol is a central nervous system depressant and slows down messages to and from the brain.',
      options:['True','False'],
      answer:'1',
      explanation: 'Alcohol is a central nervous system depressant. This means that it is a drug that slows down brain activity. It can change your mood, behavior, and self-control. It can cause problems with memory and thinking clearly.'},
    {text:'Users of this drug use a pacifier after taking it:',
      options:['Heroin','MDMA','Meth','All of the above'],
      answer:'2',
      explanation: 'Users of ecstasy or MDMA (also known as Molly) use pacifiers to keep them from grinding their teeth down when they are high.'},
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
    <div className="ml-auto mr-auto w-3/5">
      <div className='font-bold text-2xl mt-2 mb-2'>
         Drug Abuse Quiz
      </div>
      <div className='text-base mb-5'>
          How much do you really know about drugs?
      </div>

    <div className="ml-auto mr-auto w-full">
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
                    <TextGenerateEffect words={questionText["text"]} duration={0.25}/>
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
            <Alert variant="correct" className='mt-5'>
              <AlertTitle>Correct</AlertTitle>
              <AlertDescription>{questionText["explanation"]}</AlertDescription>
            </Alert>
          }

          {(isSubmitted && !isCorrect) && 
            <Alert variant="wrong" className='mt-5'>
              <AlertTitle>Wrong</AlertTitle>
              <AlertDescription>{questionText["explanation"]}</AlertDescription>
            </Alert>
          }

        </CardContent>
      </Card>
        )}
      })}

      
      {quizDone && 
        <Card>
          <CardHeader>
            <CardTitle>You scored {score} / {quiz.length}</CardTitle>
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
    </div>

    
  );
}
