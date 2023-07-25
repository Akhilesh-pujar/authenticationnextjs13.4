//in beginning of react or next we use to write 
//logic for get , post,update,delete in different file
//but that is not standardize form so now in next js
//it follows standardized format

import {connect} from "@/dbconfig/dbConfig"
import USer from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect()


export async function POST(request:NextRequest){
   
    try{
        const reqBody  = await request.json()
        
        const {username,email,password} = reqBody
        console.log(reqBody);

        //check if user already exist or not

        const user = await USer.findOne({email})

        if(user){
            return NextResponse.json({error:"user already exist"},{status:400})

        }

        //hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        
        const newuser = new USer({
            username,
            email,
            password:hashedPassword
        })

       const saveUser =  await newuser.save()
       console.log(saveUser);

       return NextResponse.json({
        message:"user created succesfully",
        success:true,
        saveUser
       })
  
 
    }
    catch(error:any){
        return NextResponse.json({error: error.message},
            {status:500})
    }

}