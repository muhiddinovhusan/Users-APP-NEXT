import { NextResponse } from "next/server";
import { addUser, getUser, users } from "../../../lib/data";

export async function GET() {
    try {
        const users = getUser();
        return NextResponse.json({ message: "OK", users }, {
            status: 200
        })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {
            status: 500
        })

    }

}

export const POST = async(req : Request, res :Response)=> {
    const {name , fullName , country, isMarried,gender} = await req.json();
    try {
        const id = users.length +1
        const user = {name , fullName,country, isMarried, gender, id :id}
        await addUser(user);
        return NextResponse.json({ message: "OK", user }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, {
            status: 500
        })
    }

}