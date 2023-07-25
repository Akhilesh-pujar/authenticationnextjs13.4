/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Link from "next/link";
import React, {  useEffect } from "react";
import {useRouter} from "next/navigation";

import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";




export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [user,setUser] = React.useState({
    email:"",
    password:"",
    username:"",

  })
  const [buttonDisable, setbutonDisable] = React.useState(false);

  const [loading, setloading] = useState(false);

  const onSignup = async ()=>{
    try{
      setloading(true);
     const response = await axios.post("/api/users/signup",user);

     console.log("signup sucess",response.data);
     router.push("/login");

    }
    catch(error:any){
        toast.error(error.message)
        console.log(error.message);
    }
    finally{
      setloading(false)
    }


  }

  useEffect(()=>{
  if(user.email.length > 0 && user.password.length > 0 && user.username.length> 0 ){
    setbutonDisable(false);
  }
  else{
    setbutonDisable(true);
  }
  },[user]);



  return (
    <div className="flex flex-col items-center justify-center
     min-h-screen py-2
    ">
      <h1>{loading ? "Processing":"Sign up"}</h1>

      <hr></hr>



<label htmlFor="username">username</label>
      <input
      id="username"
      type="text"
      value={user.username}
      onChange={(e)=>setUser({...user, username:e.target.value})}
     placeholder="username"

     className="p-2  border border-gray-400 rounded-lg
      mb-4 text-black
     "

      />


<label htmlFor="email">email</label>
      <input
      id="email"
      type="email"
      value={user.email}
      onChange={(e)=>setUser({...user, email:e.target.value})}
     placeholder="email"

     className="p-2  border border-gray-400 rounded-lg
      mb-4 text-black
     "

      />


<label htmlFor="password">password</label>
      <input
      id="password"
      type="password"
      value={user.password}
      onChange={(e)=>setUser({...user, password:e.target.value})}
     placeholder="password"

     className="p-2  border border-gray-400 rounded-lg
      mb-4 text-black
     "

      />

      <button
      onClick={onSignup}
      className="p-2 border border-gray-400 rounded-lg mb-4
       focus:outline-none focus:border-gray-600
      "
      >{buttonDisable ? "No sign up":"Sign up" }</button>

      <Link href="/login">Visit Login if you have already signed up</Link>
    </div>
  )
}


