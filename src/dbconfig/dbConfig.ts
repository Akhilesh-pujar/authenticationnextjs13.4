import mongoose, { mongo }  from "mongoose";

export async function connect(){
    try{
      mongoose.connect(process.env.MONGO_URL!) 
      //here "!" is used because typescript thinks that this mongo url might not be there so that
      //is why we put"!"
      
      const connection = mongoose.connection;

      connection.on('connected', ()=>{
        console.log('mongo db connected suceessfully');
      })


      connection.on('error', (err)=>{
        console.log('mongo db connection error'+err);
        process.exit();
      })


    }
    catch(error){
      console.log('something went wrong');
      console.log(error);
    }
}