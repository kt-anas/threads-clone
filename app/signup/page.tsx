import React from 'react';
import styles from '../ui/signup/SignupPage.module.scss'; // Assuming you create a separate stylesheet

const Signup: React.FC = () => {
  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm}>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
