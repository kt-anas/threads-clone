import React, { useState } from 'react';
import styles from './editProfile.module.scss'; // Import the CSS module
import { BsPersonFillAdd } from 'react-icons/bs';

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose }) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open the file input dialog
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-container']}>
        <button onClick={onClose} className={styles['modal-close-btn']}>
          ✕
        </button>
       
        <form className={styles['modal-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </div>

          <div className={styles['form-group']}>
            <label>Profile Picture</label>
            <button onClick={handleImageUpload}>
              <BsPersonFillAdd size={24} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the file input
            />
            {previewImage && (
              <div className={styles['image-preview']}>
                <img src={previewImage} alt="Profile Preview" />
              </div>
            )}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="bio">Bio</label>
            <input type="text" id="bio" />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
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
