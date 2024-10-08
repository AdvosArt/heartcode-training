"use client"

import React,{useState} from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import { Button } from '@/components/ui/button';
import { FaCheckCircle,FaTimesCircle } from "react-icons/fa";


const Question = (props:any) => {
  const [answer,setAnswer] = useState('');
  const [submitted,setSubmitted] = useState(false);
  const submitAnswer = () => {
      setSubmitted(true);
  }
  const nextQuestion = () => {
      props.save(answer == props.data.answer)
  }
  const checkAnswer = (val:string) => {
      if(val == answer && val == props.data.answer){
          return true;
      }
      if(val == answer && val != props.data.answer){
          return false;
      }
      if(val != answer && val == props.data.answer){
      return true;
      }
  }
  return (
      <div className='flex flex-col'>
          <Label className='text-2xl mb-4' htmlFor="">{props.data.text}</Label>
          {props.data.options.map((x:any,i:any) => {
              return <div key={i} className={`${answer == x ? 'border-[#aaa]' : ''} border px-2 py-2 mt-1 mb-1 rounded flex justify-between items-center cursor-pointer`} 
              onClick={()=> submitted ? '' : setAnswer(x)}>
                  <span>{x}</span>
                  {submitted && checkAnswer(x) == true && <FaCheckCircle size={20} color='#0cde0c'></FaCheckCircle>} 
                  {submitted && checkAnswer(x) == false && <FaTimesCircle size={20} color='#de3c3c'></FaTimesCircle>}
              </div>
          })}
          <Separator className="my-2" />
          {submitted ? <Button className='mt-1' onClick={()=>nextQuestion()}>Next</Button> : <Button className='mt-1' onClick={()=>submitAnswer()}>Submit</Button>}
      </div>
  );
}


export default function Home() {
  const [question,setQuestion] = useState(1);
  const [answers,setAnswers] = useState([]);
  const [quizdone,setQuizdone] = useState(false);
  const [score,setScore] = useState(0);
  const quiz = [
      {text:'What is openAI 1 ?',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'Opt 2'},
      {text:'What is openAI 2 ?',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'Opt 3'},
      {text:'What is openAI 3 ?',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'Opt 4'},
      {text:'What is openAI 4 ?',options:['Opt 1','Opt 2','Opt 3','Opt 4'],answer:'Opt 1'},
  ];
  const saveAnswer = (e:any,q:any) => {
      let newAnswers:any = answers;
      newAnswers.push({
          question:q,answer:e
      });
      setAnswers(newAnswers);
      if(e){setScore(score + 1)}
      if(question < quiz.length){
          setQuestion(question + 1);
      }
      if(question == quiz.length){
          setQuizdone(true);
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
          <Card>
            <CardHeader>
              <CardTitle>Question 1:</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quis.
              </div>

              <div className="flex ml-10">
                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>
              </div>

            </CardContent>
          </Card>
          </div>

          <div className="ml-auto mr-auto w-4/5">
          <Card>
            <CardHeader>
                {!quizdone && <div>
                <Progress className='h-[2px] mb-5 opacity-50' value={question * 100 / quiz.length} />
                <CardTitle>Question {question} / {quiz.length}</CardTitle>
                </div>}
            </CardHeader>

            <CardContent>
              <div className='w-[400px]'>

                  {!quizdone && quiz.map((x,i) => {
                      if((i + 1) == question){
                          return <Question key={i} data={x} save={(e:any)=>saveAnswer(e,(i+1))}></Question>
                      }
                  })}

                  {quizdone && <div className='flex flex-col items-center'>
                      <Label className='text-3xl'>Quiz Result</Label>
                      <Separator className="my-2" />
                      <span className='text-2xl'>{score}/{quiz.length} Questions are correct !</span>
                      
                      
                      <span className='text-2xl'> You got {score * 100} Points</span>
                      
                  </div>

                  }

              </div>
            </CardContent>
          </Card>
          </div>

        </CardContent>
      </Card>


    </div>

    
  );
}
