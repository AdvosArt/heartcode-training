"use client"

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
//import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { Input } from '@/components/ui/input';
import { uploadScore } from '../server/user';
import { BackgroundGradient } from '@/components/ui/background-gradient';

const FormSchema_quiz = z.object({
  answer: z.enum(["1", "2", "3", "4"], { // Add more options here
    required_error: "Please select an answer.",
  }),
})

const FormSchema_name = z.object({
  name: z.string({
    required_error: "Please enter a name."
  }).max(21, {
    message: "name must be no longer than 20 characters."
  }),
})

export default function Home() {
  const [isCorrect, setIsCorrect] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(1)
  const [quizDone, setQuizDone] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [scoreSubmitted, setScoreSubmitted] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [debugMode, setDebugMode] = useState(false)

  const form_quiz = useForm<z.infer<typeof FormSchema_quiz>>({
    resolver: zodResolver(FormSchema_quiz),
  })

  const form_name = useForm<z.infer<typeof FormSchema_name>>({
    resolver: zodResolver(FormSchema_name),
  })

  // const quiz = [
  //   {text:'Qn1',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'2',explanation:'Ex'},
  // ];

  const quiz = [
    {
      text: 'Which one of these is NOT a commonly used recrational drug?',
      options: ['Methamphetamine', 'Ketamine', 'Fentanyl', 'Paracetamol',],
      answer: '4',
      explanation: 'Paracetamol is a common pailkiller drug. While still dangerous to overdose on, it is not a common recreational drug.'
    },
    {
      text: 'Myth or Fact: As a Singaporean, taking drugs overseas will still get me arrested upon returning to the country.',
      options: ['Myth', 'Fact'],
      answer: '2',
      explanation: 'Any Singapore Citizen or Permanent Resident found to have abused drugs overseas will be treated as if he/she had abused drugs within Singapore.'
    },
    {
      text: 'For how long can cocaine be detected in a standard urine test?',
      options: ['48 hours', '4 to 5 days', '27 to 30 days', '90 days'],
      answer: '2',
      explanation: 'Cocaine stays in urine for up to 4 to 5 days, in Blood and Saliva for up to 48 hours, and in hair follicles for up to 90 days.'
    },
    {
      text: "Once you start injecting drugs it's impossible to stop using drugs.",
      options: ['True', 'False'],
      answer: '2',
      explanation: 'Although it is very difficult, it is possible to stop taking drugs with enough help like rehabilitaion and therapy.'
    },
    {
      text: 'Which of the following is NOT a long term effect from cannabis?',
      options: ['Feeling permanently relaxed', 'Reduced Motivation', 'Frequent illness', 'Change in hormones'],
      answer: '1',
      explanation: 'Long term cannabis use can affect motivation, hormones and general health but does not cause a permanent feeling of relaxation.'
    },

    {
      text: 'Myth or Fact: Marijuana is not as bad for you as cigarettes',
      options: ['Myth', 'Fact'],
      answer: '1',
      explanation: 'Marijuana smoke contains more carcinogens than tobacco'
    },
    {
      text: 'Penalties for the possesion or consumption of Cannabis in Singapore are:',
      options: ['Up to 10 years imprisonment', 'S$20,000 fine', 'All of the above'],
      answer: '3',
      explanation: 'Penalties for the possesion or consumption of drugs of any kind in Singapore are up to 10 years imprisonment and a S$20,000 fine.'
    },
    {
      text: 'Heroin is made from the poppy plant.',
      options: ['True', 'False'],
      answer: '1',
      explanation: 'The poppy plant, Papaver somniferum, produces opium, a powerful narcotic whose derivatives include morphine, codeine, heroin, and oxycodone.'
    },
    {
      text: 'Myth or Fact: Being addicted to drugs can damage the brain',
      options: ['Myth', 'Fact'],
      answer: '2',
      explanation: 'Drugs can damage brain cells through several mechanisms. Psychostimulants (e.g., amphetamines) and alcohol disrupt the integrity of the blood-brain barrier (BBB), which can change the functioning of your brain cells due to increased permeability.'
    },
    {
      text: 'Death from ecstasy (MDMA) use can be caused by the body overheating and by dehydration.',
      options: ['True', 'False'],
      answer: '1',
      explanation: 'Symptoms of Ecstacy Overdose include abnormal heart rates, body temperature dysregulation, hyperthermia, and seizures.'
    },

    {
      text: 'Myth or Fact: Steroid creams can be bought in drug stores. Doctors prescribe steroids to treat allergies. So using steroids to build muscles must be OK.',
      options: ['Myth', 'Fact'],
      answer: '1',
      explanation: 'There are different types of steroids. Steroids used to treat rashes and allergies are not the same as steroids used to increase muscle growth.'
    },
    {
      text: 'The most common channel of communication for drug dealers online is:',
      options: ['Whatsapp', 'Wechat', 'Telegram', "Discord"],
      answer: '3',
      explanation: 'Telegram is known for its two layers of secure encryption, so it is the go-to choice for drug dealers.'
    },
    {
      text: 'Alcohol is a central nervous system depressant and slows down messages to and from the brain.',
      options: ['True', 'False'],
      answer: '1',
      explanation: 'Alcohol is a central nervous system depressant. This means that it is a drug that slows down brain activity. It can change your mood, behavior, and self-control. It can cause problems with memory and thinking clearly.'
    },
    {
      text: 'Users of this drug use a pacifier after taking it:',
      options: ['Heroin', 'MDMA', 'Meth', 'All of the above'],
      answer: '2',
      explanation: 'Users of ecstasy or MDMA (also known as Molly) use pacifiers to keep them from grinding their teeth down when they are high.'
    },
    {
      text: 'Myth or Fact: Alcohol makes it easier for people to socialise.',
      options: ['Myth', 'Fact'],
      answer: '1',
      explanation: 'Alcohol in small quantities can make people feel more relaxed and sociable. However, alcohol is a “downer”. Drinking too much alcohol can make people want to withdraw from others, or feel aggressive.'
    },

    {
      text: 'A burnt spoon could indicate the use of which drug?',
      options: ['Crack Cocaine', 'Heroin', 'All of the above'],
      answer: '3',
      explanation: 'Spoons are heated to dissolve heroin for injection purposes. Drug users will heat crack cocaine to smoke.'
    },
    {
      text: 'Glass pipes are usually used to smoke:',
      options: ['Meth', 'Ecstacy', 'Fentanyl', 'All of the above'],
      answer: '1',
      explanation: 'In addition to being snorted, injected or taken in pill form, drug users also smoke crystal meth using a glass pipe. Glass pipes are also used to smoke PCP, crack cocaine and opium.'
    },
    {
      text: 'Myth or Fact: You can get addicted to perscription drugs.',
      options: ['Myth', 'Fact'],
      answer: '2',
      explanation: "Just because a doctor prescribes medication doesn't mean it's harmless. The reality is that prescription drugs, such as opiates and benzodiazepines, are highly addictive and can cause bigger problems than what they were initially prescribed to treat."
    },
    {
      text: 'Myth or Fact: You will get addicted to Heroin the first time you use it',
      options: ['Myth', 'Fact'],
      answer: '1',
      explanation: 'Heroin has an undeniably high addiction potential. But that doesn’t mean that every person who tries heroin gets addicted to it. In fact, only 23% of people who try heroin end up developing a substance use disorder. Regardless, you should not be tempted to try it.'
    },
    {
      text: 'Myth or Fact: The penelty for Drug trafficking in Singapore is the death sentence.',
      options: ['Myth', 'Fact'],
      answer: '2',
      explanation: 'Illegal traffic, import, or export of drugs of any kind will result in the death penalty'
    },

  ];

  function onQuestionSubmit(data: z.infer<typeof FormSchema_quiz>) {
    setIsSubmitted(true)
    if (data["answer"] == currentAnswer) {
      setIsCorrect(true);
      setScore(score + 1)
    }
  }

  function onScoreSubmit(data: z.infer<typeof FormSchema_name>) {
    console.log("onScoreSubmit")
    console.log(data.name)
    uploadScore(data.name, score)
  }

  function setAnswer(x: any) {
    setCurrentAnswer(x['answer'])
  }

  function nextQuestion() {
    form_quiz.reset()
    setQuestion(question + 1)
    setIsCorrect(false)
    setIsSubmitted(false)

    if (question == quiz.length) {
      setQuizDone(true)
    }
  }

  function submitQuizScore() {
    const name: string = nameInputRef.current?.value || "anon"
    setScoreSubmitted(true)
    uploadScore(name, score)
  }

  function toggleDebug() {
    setDebugMode(!debugMode)
  }

  return (
    <div className='bg-gradient-to-t from-[#FF6100]/25 dark:from-[#0094FF]/25 min-h-screen'>
      <div className="mx-auto w-3/5">
        <div className='font-bold text-2xl mt-2 mb-2'>
          Substance Abuse Quiz
        </div>
        <div className='text-base mb-5'>
          How much do you really know about drugs?
        </div>

        <div className="mx-auto w-full">
          <BackgroundGradient className="rounded-[22px] sm:p-0 bg-white dark:bg-zinc-900">
            {!quizDone && quiz.map((questionText, i) => {
              if ((i + 1) == question) {
                return (

                  <Card className="rounded-[22px]">
                    <CardHeader>
                      <Progress className="mb-2" value={question / quiz.length * 100} />
                      <CardTitle>Question {question} / {quiz.length}:</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <Form {...form_quiz}>
                        <form onSubmit={form_quiz.handleSubmit(onQuestionSubmit)} className="space-y-8">
                          <FormField
                            control={form_quiz.control}
                            name="answer"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>
                                  {/* <TextGenerateEffect words={questionText["text"]} duration={0.01}/> */}
                                  {questionText["text"]}
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
                                            <RadioGroupItem value={(j + 1).toString()} />
                                          </FormControl>
                                          {Number(questionText["answer"]) == j + 1 && debugMode &&
                                            <FormLabel className="font-normal text-emerald-600">
                                              {/* <TextGenerateEffect words={option} duration={1} /> */}
                                              {option}
                                            </FormLabel>
                                          }

                                          {Number(questionText["answer"]) != j + 1 && debugMode &&
                                            <FormLabel className="font-normal">
                                              {/* <TextGenerateEffect words={option} duration={1} /> */}
                                              {option}
                                            </FormLabel>
                                          }

                                          {!debugMode &&
                                            <FormLabel className="font-normal">
                                              {/* <TextGenerateEffect words={option} duration={1} /> */}
                                              {option}
                                            </FormLabel>
                                          }
                                        </FormItem>
                                      )
                                    })}

                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className='flex justify-center'>
                            {isSubmitted ? <Button onClick={() => nextQuestion()}>Next</Button> : <Button onClick={() => setAnswer(questionText)}>Submit</Button>}
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
                ) // End of return
              } // End of if
            })}

            {quizDone &&
              <Card className="rounded-[22px]">
                <CardHeader>
                  <CardTitle>You scored {score} / {quiz.length}</CardTitle>
                </CardHeader>
                <CardContent>

                  {score == quiz.length &&
                    <div>
                      <TypewriterEffect words={[{ text: "Exellent" }, { text: "Job!" }]} />
                    </div>
                  }

                  {score < quiz.length && score > quiz.length / 2 &&
                    <div>
                      <TypewriterEffect words={[{ text: "Good" }, { text: "Job!" }]} />
                    </div>
                  }

                  {score <= quiz.length / 2 && score > 0 &&
                    <div>
                      <TypewriterEffect words={[{ text: "Nice" }, { text: "Try." }]} />
                    </div>
                  }

                  {score == 0 &&
                    <div>
                      <TypewriterEffect words={[{ text: "Do" }, { text: "Better." }]} />
                    </div>
                  }

                  {!scoreSubmitted &&
                    <div className='mt-5 mx-auto w-4/5'>
                      <Form {...form_name}>
                        <form onSubmit={form_name.handleSubmit(onScoreSubmit)}>
                          <FormField
                            control={form_name.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Submit Quiz Score</FormLabel>
                                <FormDescription>Enter your name:</FormDescription>
                                <FormControl>
                                  <Input ref={nameInputRef} placeholder="your name here" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='flex justify-center'>
                            <Button onClick={() => submitQuizScore()}>Submit Score</Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  }

                  {scoreSubmitted &&
                    <div className='mt-5 mx-auto w-4/5 text-center'>
                      <p className='text-2xl'>Your score has been submitted!</p>
                      <p>Refresh the page to try the quiz again.</p>
                    </div>
                  }

                </CardContent>
              </Card>

            }
          </BackgroundGradient>
        </div>
      </div>

      <div onClick={() => toggleDebug()} className='h-5 mx-auto w-1/12' />

    </div>

  );
}
