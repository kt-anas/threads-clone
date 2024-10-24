'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../ui/signup/SignupPage.module.scss';
import InputField from '../Inputs/InputField';
 
import Signup from '@/app/(auth)/signup/page';
 

const InForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const router = useRouter();
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const  res = await Signup({ name, username, email, password, phone });
   console.log(res);
}
 
    

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm}>
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default InForm;
