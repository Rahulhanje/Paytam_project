import React from 'react';

import { Headding } from "../components/mainHeadding";
import { Subheadding } from "../components/subheadding";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";

export function Signin(){
  return(
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p2 h-max px-4">
        <Headding label={"Sign In"} />
        <Subheadding label="Enter Your Credentials to access your account"></Subheadding>
        <InputBox label='Email Id' placeholder='rahulhanje0.7@gmail.com'></InputBox>
        <InputBox label='Password' placeholder='Enter the Strong Password' ></InputBox>
       <div className="pt-4">
          <Button label={"Sign In"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} /> 
      </div>
    </div>
  </div>
  )
}
