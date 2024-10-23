'use server';


import { cookies } from "next/headers";


export async function setCookie(userId:string){
    const cookieStore = cookies();

    cookieStore.set('userId',userId)
}