import {  deleteUser, updateUser, users } from "@/lib/data"
import { NextResponse } from "next/server";



export const GET = async (req: Request, context: {
    params: {
        id: string
    }
}) => {
    const id = +context.params.id
    if(id > users.length) {
        return NextResponse.json({message : "User Not found"}, {
            status : 404
        })
    }
    const user = users.find((cm) => cm.id === id)
    return  NextResponse.json(user)
}

export const PUT = async (req: Request) =>{
try {
    const {name, fullName, country, isMarried, gender} = await req.json();
    const id = +req.url.split("/users/")[1]
    updateUser(id,name,fullName,country,isMarried,gender)
  
    return NextResponse.json({message : "OK"}, {status: 200})
 
} catch (error) {
    
    return NextResponse.json({message : "Error", error }, {
        status: 500
    })
}
}

export const DELETE = async (req: Request )=>{
 try {
    const id =  +req.url.split("/users/")[1]
   deleteUser(id);
return NextResponse.json({message : "User deleted"}, {status :200})

 }catch (err) {

     return NextResponse.json({message : "User Not found"}, {
         status : 500
     })
 }

}