import React from 'react';
import styles from '../../../ui/signup/SignupPage.module.scss';
import axiosInstance from '@/axios/axiosInstance';
import InForm from '@/components/SigninForm/InForm';

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export const signup = async (userData: UserData) => {
  try {
    const response = await axiosInstance.post('/users/signup', userData);
    return response.data;
  } catch (error: any) {
    console.error( error);
    return null;  
  }
};

const Signup: React.FC = () => {
  return (
    <div className={styles.signupContainer}>
      <InForm />
    </div>
  );
};

export default Signup;
