'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../ui/signup/SignupPage.module.scss';
import axiosInstance from '@/axios/axiosInstance';
import InputField from '@/components/Inputs/InputField';

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const signup = async (userData: UserData) => {
    try {
      const response = await axiosInstance.post('/users/signup', userData);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;  
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    setError(null);

    
    if (!email.includes('@')) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userData: UserData = { name, username, email, password, phone };
    
    setLoading(true);
    const res = await signup(userData);
    setLoading(false);

    if (res) {
      router.push('/login');  
    } else {
      setError('Signup failed. Please try again.');
    }
  };


  
  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        {error && <p className={styles.error}>{error}</p>}
        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
