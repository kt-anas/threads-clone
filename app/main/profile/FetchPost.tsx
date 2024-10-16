


import axiosInstance from "@/axios/axiosInstance";
import styles from '../../../ui/main/main.module.scss';
import ProfileImage from "@/components/ProfileImage";
import TimeAgo from "@/components/TimeAgo";
import styleMenu from '@/components/DropdowMenu.module.scss';
import { Icons } from "@/ui/Icons/users";

export default async function FetchPost () {

    type Post = {
        _id: string;
        userProfilePic: string;
        username: string;
        text: string;
        image: string;
        createdOn: string;
        replies: Reply[];
        likes: string[];
        reposts: string[];
    };

    type Reply = {
        _id: string;
        userId: string;
        userProfilePic: string;
        username: string;
        text: string;
    };

    const posts: Post[] = [];

    
        const userId = localStorage.getItem('userId');
        
            const response = await axiosInstance.get(`/posts/${userId}`
            
            posts.push(...response.data.post);
        
    } catch (error) {
        console.error('Error fetching posts:', error);
       
    }  
    
    return(
      
            posts.map((post) => (
                <div key={post._id} className={styles["post-item"]}>
                    <div className={styles['post-user']}>
                        <ProfileImage
                            profilePic={post.userProfilePic}
                            altText="Profile"
                            className={styles['profile-image']}
                        />
                        <div className={styles['post-details']}>
                            <h3>{post.username}</h3>
                            <TimeAgo dateString={post.createdOn} />
                        </div>
                        {/* <div className={styleMenu['menu-container']}>
                            <Icons.circleMenu className={styleMenu['menu']} onClick={() => toggleDropdown(post._id)} />
                            {selectedPostId === post._id && (
                                <DropdownMenu>
                                    <button onClick={() => deletePost(post._id)}>Delete</button>
                                    
                                </DropdownMenu>
                            )}
                        </div> */}
                    </div>
                    <p className={styles['post-text']}>{post.text}</p>
                    {post.image && (
                        <img src={post.image} alt="post" className={styles["post-image"]} />
                    )}
                    {/* <div className={style["post-actions-container"]}>
                        <LikeButton initialLike={post.likes.length} postId={post._id} userId={localStorage.getItem('userId')} likedUsers={post.likes} />
                        <ReplyButton replyCount={post.replies.length}  openComment={() => setSelectedPostId(post._id)} postId={post._id} setPostId={setSelectedPostId}/>
                        <RepostButton repostCount={post.reposts.length}     postId={post._id} setPostId={setSelectedPostId} opernRepost={() => setSelectedPostId(post._id)} />
                    </div> */}
                    
                </div>
            ))
        ) 
    

    
}