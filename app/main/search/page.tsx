'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../ui/main/search.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Icons } from '@/ui/Icons/users';
import axiosInstance from '@/axios/axiosInstance';

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});
    const [senderId, setSenderId] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    interface User {
        _id: string;
        followers: string[];
        profilePic?: string;
        username: string;
        name: string;
    }

    // Load senderId from localStorage and initialize state

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
                            
            setSenderId(userId);
        }
    }, [senderId]);

    // Fetch users once senderId is set
    useEffect(() => {
        const getUsers = async () => {
            if (senderId) {
                try {
                    const response = await axiosInstance.get('/users');
                    if (response.status === 200) {
                        const userMap: { [key: string]: boolean } = {};
                        response.data.users.forEach((user: User) => {
                            userMap[user._id] = user.followers.includes(senderId);
                        });
                        setUsers(response.data.users);
                        setFilteredUsers(response.data.users);
                        setIsFollowing(userMap);
                        localStorage.setItem('isFollowing', JSON.stringify(userMap));
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };
        getUsers();
    }, [senderId]);

    // Handle search input changes
    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFollow = async (userId: string) => {
        if (!senderId) return;
        try {
            const followingState = { ...isFollowing };
            if (followingState[userId]) {
                await axiosInstance.post(`/users/unfollow/${userId}`, { userUnfollowId: senderId });
                followingState[userId] = false;
            } else {
                await axiosInstance.post(`/users/follow/${userId}`, { userFollowId: senderId });
                followingState[userId] = true;
            }
            setIsFollowing(followingState);
            localStorage.setItem('isFollowing', JSON.stringify(followingState));

            // Update users state with the new follow status
            setUsers(prevUsers =>
                prevUsers.map(user => {
                    if (user._id === userId) {
                        return {
                            ...user,
                            followers: followingState[userId]
                                ? [...user.followers, senderId]
                                : user.followers.filter(followerId => followerId !== senderId)
                        };
                    }
                    return user;
                })
            );
        } catch (error) {
            console.error('Error handling follow/unfollow:', error);
        }
    };

    return (
        <>
            <p className={styles.search}>Search</p>
            <div className={styles['search-container']}>
                <div className={styles['search-bar']}>
                    <Icons.search />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles['search-input']}
                    />
                </div>

                <div className={styles['results-container']}>
                    {filteredUsers.map((user) => (
                        <div key={user._id} className={styles['result-item']}>
                            <div className={styles['post-user']}>
                                <img
                                    src={user.profilePic || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                    alt="profile"
                                    className={styles['profile-image']}
                                />
                                <div className={styles['user-details']}>
                                    <div className={styles['user-info']}>
                                        <p className={styles['post-text']}>{user.name}</p>
                                        <p className={styles['profile-name']}>{user.username}</p>
                                        <p>{user.followers.length} followers</p>
                                    </div>
                                    <button onClick={() => handleFollow(user._id)}>
                                        {isFollowing[user._id] ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
