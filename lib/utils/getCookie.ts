import { cookies } from "next/headers";

export function getUserId(){
    const cookieStore = cookies();

    const userId = cookieStore.get('userId')
       
    if(userId){
        return userId.value;


    }

    return null;
}