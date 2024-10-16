 'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../ui/main/search.module.scss';
import { useAppDispatch } from '@/lib/hooks';
import { Icons } from '@/ui/Icons/users';
import axiosInstance from '@/axios/axiosInstance';
import FollowBtn from '@/components/FollowBtn/FollowBtn';

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  
    const [senderId, setSenderId] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);   

    interface User {
        _id: string;
        followers: string[];
        profilePic?: string;
        username: string;
        name: string;
    }

    useEffect(() => { 
        const getUsers = async () => {
            try {
                const res = await axiosInstance.get('/users');
                setUsers(res.data.users);
            } catch (error) {
                console.error('Error', error);
            }
        };
        getUsers();
    }, []);  

  

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
                                    <FollowBtn userId={user._id} />
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
