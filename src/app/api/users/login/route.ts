
import USer from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbConfig";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest){
    try {
    const reqBody = await request.json()
    const {email, password} = reqBody;
    console.log(reqBody);

    //check if user exist
    const user = await USer.findOne({email})

    if(!user){
        return NextResponse.json({error:"User not exist"},{status:400})
    }

    console.log("user exist");
    //check if password is valid or not
    const validpassword = await bcryptjs.compare(password,user.password)
    if(!validpassword){
        return NextResponse.json({error:"Invalid password"}, {status:400})

    }
    console.log(user);
    //create token data
    const tokendata= {
        id: user._id,
        username: user.username,
        email: user.email,
    }
    const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!,{expiresIn:"1d"})

    const resp= NextResponse.json({
        message:"Login Successful",
        sucess:true,
    })

    resp.cookies.set("token",token,{
        httpOnly:true,
    })
  return resp;
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}