'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setUsername, setEmail, setPassword, setConfirmPassword, signupUser, setName, setPhone } from '@/store/reducers/signupSlice';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField'; // Adjust the path if necessary
import styles from '../../ui/signup/SignupPage.module.scss';

const Signup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { name, phone, username, email, password, confirmPassword, status, error } = useSelector((state: RootState) => state.signup);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Dispatch signup action with full user data
      dispatch(signupUser({ name, username, email, password, phone }));
    } else {
      console.log('Passwords do not match');
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      router.push('/login');
    }
  }, [status, router]);

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <InputField
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
        />
        <button type="submit">Sign Up</button>
      </form>
      {status === 'failed' && <p>Error: {error}</p>}
    </div>
  );
};

export default Signup;
