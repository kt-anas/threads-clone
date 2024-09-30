'use client';
import React, { useState, useEffect } from 'react';
import styles from '../../../ui/main/search.module.scss';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchUser } from '@/store/reducers/userSlice';
import { Icons } from '@/ui/Icons/users';

const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);


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
    console.log(users) 
    console.log(filteredUsers);
   
    
    return (
        <>
        <h1 className={styles.search}> Search</h1>
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
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user._id} className={styles['result-item']}>
                            <div className={styles['post-user']}>
                                {user.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt="profile"
                                        className={styles['profile-image']}
                                    />
                                ) : (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        alt="profile"
                                        className={styles['profile-image']}
                                    />
                                )}
                                <div className={styles['user-details']}>
                                    <div className={styles['user-info']}>
                                        <p className={styles['post-text']}>{user.name}</p>
                                        <p className={styles['profile-name']}>{user.username}</p>
                                        <p>{user.followers.length} followers</p>
                                    </div>

                                    <button className={styles['follow-btn']}>Follow</button>
                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p>No user found</p>
                )}
            </div>
        </div>
        </>
    );
};

export default SearchPage;
