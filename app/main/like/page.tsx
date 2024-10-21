import axiosInstance from "@/axios/axiosInstance";

export default async function LikePage() {
    let data = await axiosInstance.get('/posts');
    // console.log(data.data,'this post')
    return (
        <div>
            <h1>Like Page</h1>
        </div>
    )
}