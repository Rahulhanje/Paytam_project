import { useEffect, useState } from "react";
import { Button } from "./button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter]=useState("");


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
            setUsers(response.data.user);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchUsers();
    }, [filter]);

    return <div className="m-6">
        <div className="font-medium mt-6 text-4xl ">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value);
              
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-gray-200 shadow-lg-md" ></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-between m">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-ful text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full ">
                <div className="text-xl">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full pr-4">
            <Button onClick={(e)=>{
                 navigate("/sendMoney?id="+user._id+"&fistname="+user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}
