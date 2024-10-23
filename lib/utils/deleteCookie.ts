'use server'

import { cookies } from "next/headers"

export async function deleteCookie(){
    const cookieStore = cookies();

    cookieStore.set('userId','');
}