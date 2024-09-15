import React from 'react';

interface ProfileImageProps {
    profilePic?: string;
    altText?: string;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profilePic, altText = 'profile', className }) => {
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    return (
        <img
            src={profilePic || defaultImage}
            alt={altText}
            className={className}
        />
    );
};

export default ProfileImage;
