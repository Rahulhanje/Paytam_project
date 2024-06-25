import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";    

export function SendMoney() {
    const [searchParams] = useSearchParams();
    const id=searchParams.get("id");
    const fistname=searchParams.get("fistname");
    const [amount ,setamount]=useState(0);
    return (
        <div className="flex justify-center w-full h-screen bg-gray-200 ">
            <div className="h-full flex justify-center flex-col ">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6 ">
                        <h2 className="font-bold text-center text-3xl ">Send Money</h2>
                    </div>

                    <div className="p-6">
                        <div className="flex  items-center space-x-4">
                            <div className="flex justify-center bg-green-500 w-12 h-12 rounded-full">
                                <div className="flex item-center font-bold justify-center">
                                    <span className="text-3xl pt-1">{fistname[0].toUpperCase()}</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold  ">{fistname}</h3>
                        </div>
                        <div >
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input onChange={(e)=>{
                                        setamount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border  px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    
                                />
                            </div>
                            <div className="pt-5"><button onClick={(e)=>{
                                axios.post("http://localhost:3000/api/v1/account/transfer",{
                                    to:id,
                                    amount
                                },{
                                    headers:{
                                        Authorization:"Bearer "+localStorage.getItem("token")
                                    }
                                })
                            }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}