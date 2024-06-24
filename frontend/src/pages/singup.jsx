import React from 'react';

import { Headding } from "../components/mainHeadding";
import { Subheadding } from "../components/subheadding";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";

export function Signup(){
  return(
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p2 h-max px-4">
        <Headding label={"Sign up"} />
        <Subheadding label="Jai Hanuman"></Subheadding>
        <InputBox label='First Name' placeholder='Sanjeevkumar'></InputBox>
        <InputBox label='Last Name' placeholder='Hanje'></InputBox>
        <InputBox label='Email Id' placeholder='rahulhanje0.7@gmail.com'></InputBox>
        <InputBox label='Password' placeholder='Enter the Strong Password' ></InputBox>
       <div className="pt-4">
          <Button label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} /> 
      </div>
    </div>
  </div>
  )
}
