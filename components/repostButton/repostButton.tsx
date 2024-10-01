import React from 'react';

import { Icons } from '@/ui/Icons/users';
import styles from './repostButton.module.scss';
 interface repostButtonProps {
    repostCount: number
 }
const RepostButton: React.FC<repostButtonProps> = ({ repostCount }) => {
  return (
    <button className={styles.repostButton}>
      <Icons.repost />
      <span>{repostCount}</span>
    </button>
  );
};

export default RepostButton;
