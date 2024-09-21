import React from 'react';

import { Icons } from '@/ui/Icons/users';
 interface repostButtonProps {
    repostCount: number
 }
const RepostButton: React.FC<repostButtonProps> = ({ repostCount }) => {
  return (
    <button>
      <span>{repostCount}</span>
      <Icons.repost />
    </button>
  );
};

export default RepostButton;
