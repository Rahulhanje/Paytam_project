import { useState } from "react"

export function Appbar() {
    
    return (
        <div className="flex justify-between h-14 shadow-md ">
            <div className="flex flex-col justify-center h-full ml-5 font-bold text-3xl text-blue-500">PayTm App</div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 font-semibold text-2xl">Hello</div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex  justify-center mt-1 mr-4 px-2">
                    <div className="font-semibold flex flex-col justify-center h-full text-xl text-blue-500">U</div>
                </div>
            </div>
        </div>
    )
}