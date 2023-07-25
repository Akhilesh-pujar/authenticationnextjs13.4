/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast/headless";





export default function loginpage() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user,setUser] = React.useState({
    email:"",
    password:"",
  })
  const [buttondisable, setbuttondisable] = React.useState(false);
  const [loading,setloading] = React.useState(false);

  const onLogin = async ()=>{
    try{
      setloading(true);
      const response = await axios.post("api/users/login",user)
      toast.success("Login success")
      router.push("/profile");
      console.log(response.data);

    }
    catch(error:any){
      console.log("Login faile",error.message)
      
    }
    finally{
      setloading(false);
    }

  }

  useEffect(()=>{
   if(user.email.length > 0 && user.password.length > 0 ){
    setbuttondisable(false);
   }
   else{
    setbuttondisable(true)
   }
  },[user])



  return (
    <div className="flex flex-col items-center justify-center
     min-h-screen py-2
    ">
      <h1>{loading ? "Processing":"Log in"}</h1>

      <hr></hr>



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
      onClick={onLogin}
      className="p-2 border border-gray-400 rounded-lg mb-4
       focus:outline-none focus:border-gray-600
      "
      >{buttondisable ? "No login":"log in"}</button>

      <Link href="/signup">Visit sign up page </Link>
    </div>
  )
}


