import React from 'react';
import { useState } from 'react';
import { Headding } from "../components/mainHeadding";
import { Subheadding } from "../components/subheadding";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";
import axios from "axios";
import { useNavigate } from 'react-router-dom';




export function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const ButtonHandler=async ()=>{
    try {
      const response= await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      console.log('Response:',response);
    } catch (error) {
      console.error('Error:', error);
    }
  } 
     
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p2 h-max px-4">
          <Headding label={"Sign up"} />
          <Subheadding label="Jai Hanuman"></Subheadding>
          <InputBox onChange={e => {
            setfirstName(e.target.value)
          }} label='First Name' placeholder='Sanjeevkumar'></InputBox>
          <InputBox onChange={e => {
            setlastName(e.target.value)
          }} label='Last Name' placeholder='Hanje'></InputBox>
          <InputBox onChange={e => {
            setusername(e.target.value)
          }} label='Email Id' placeholder='rahulhanje0.7@gmail.com'></InputBox>
          <InputBox onChange={e => {
            setPassword(e.target.value)
          }} label='Password' placeholder='Enter the Strong Password' ></InputBox>
          <div className="pt-4">
            <Button onClick={ButtonHandler}
           
            label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}
