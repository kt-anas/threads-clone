
import React from 'react'
import styles from '../ui/signup/SignupPage.module.scss';
interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
 const InputField: React.FC<InputFieldProps> = ({type, placeholder, value, onChange}) => {
  return (
     <input   type={type}
     placeholder={placeholder}
     value={value}
     onChange={onChange}
     className={styles.inputField}
   />
  )
}

export default InputField
