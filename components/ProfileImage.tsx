import Image from 'next/image';
import React from 'react';

interface ProfileImageProps {
    profilePic?: string;
    altText?: string;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profilePic, altText = 'profile', className }) => {
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    return (
        <div className={className}>
            <Image
                src={profilePic || defaultImage}
                alt={altText}
                width={50}  
                height={50}  
                className={className}
                placeholder="blur"  
                blurDataURL="/placeholder-image-path.png" 
            />
        </div>
    );
};

export default ProfileImage;
