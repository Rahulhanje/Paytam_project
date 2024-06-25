import React from 'react';
import { useState } from 'react';
import { Headding } from "../components/mainHeadding";
import { Subheadding } from "../components/subheadding";
import { InputBox } from "../components/inputBox";
import { Button } from "../components/button";
import { BottomWarning } from "../components/bottomWarning";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const [username1,set1username]=useState("");
export const Username = () => (
    username
)
console.log("usename is ="+username1);
export function Signin(){
  const navigate=useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const ButtonHandler=async ()=>{
    try {
      const response= await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
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
     
  return(
    <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p2 h-max px-4">
        <Headding label={"Sign In"} />
        <Subheadding label="Enter Your Credentials to access your account"></Subheadding>
        <InputBox onChange={(e)=>{
              setusername(e.target.value);
              set1username(e.target.value);
          }}label='Email Id' placeholder='rahulhanje0.7@gmail.com'></InputBox>
        <InputBox onChange={(e)=>{
              setPassword(e.target.value);
          }} label='Password' placeholder='Enter the Strong Password' ></InputBox>
       <div className="pt-4">
          <Button onClick={ButtonHandler} label={"Sign In"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} /> 
      </div>
    </div>
  </div>
  )
}
export default username