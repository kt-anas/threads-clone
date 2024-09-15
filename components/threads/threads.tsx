// components/Threads.tsx
import React, { ReactNode } from 'react';
import { useState } from 'react';
import styles from './threads.module.scss';

interface ThreadsProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Threads: React.FC<ThreadsProps> = ({ isOpen, onClose, children }) => {
     
  if (!isOpen) return null;

  return (
  
   <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  
   
  );
};

export default Threads;
