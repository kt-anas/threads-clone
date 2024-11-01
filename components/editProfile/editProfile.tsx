import React, { useEffect, useState } from 'react';
import styles from './editProfile.module.scss';
import { BsPersonFillAdd } from 'react-icons/bs';
import axiosInstance from '@/axios/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { fetchUser } from '@/store/userSlice';
 

interface EditProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();
 
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            const fetchProfileData = async () => {
                try {
                    const response = await axiosInstance.get(`/users/${localStorage.getItem('userId')}`);
                    if (response.status === 200) {
                        const userData = response.data.user;
                        setName(userData.name);
                        setUsername(userData.username);
                        setEmail(userData.email);
                        setBio(userData.bio);
                        setPreviewImage(userData.profilePic);
                    }
                } catch (error) {
                    console.log('Error fetching profile data:', error);
                }
            };
            fetchProfileData();
        }
    }, [isOpen]);

    const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {  
            setProfilePic(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('bio', bio);
            if (profilePic) formData.append('profilePic', profilePic);

            const response = await axiosInstance.patch(`/users/${localStorage.getItem('userId')}`, formData);
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.user));

                onClose();
                dispatch(fetchUser());

            }
        } catch (error) {
            console.log('Error updating profile:', error);

        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-container']}>
                <button onClick={onClose} className={styles['modal-close-btn']}>
                    x
                </button>

                <form className={styles['modal-form']} onSubmit={handleSubmit}>
                    <div className={styles['form-group']}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className={styles['profile-pic-container']}>
                            <button onClick={handleImageUpload}>
                                <BsPersonFillAdd size={24} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {previewImage && (
                                <div className={styles['image-preview']}>
                                    <img src={previewImage} alt="Profile Preview" />
                                </div>
                            )}

                        </div>
                    </div>




                   

                    <div className={styles['form-group']}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="bio">Bio</label>
                        <input
                            type="text"
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <div className={styles['form-group']}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles['submit-btn']}>
                        Done
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
