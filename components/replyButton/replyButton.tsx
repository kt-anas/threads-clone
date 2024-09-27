import { Icons } from '@/ui/Icons/users'
import React from 'react'
import styles from './replyButton.module.scss'
 interface replyButtonProps {
  replyCount: number
}
 
const ReplyButton: React.FC<replyButtonProps> = ({replyCount}) => {
  return (
    <button className={styles.replyButton}>
      <Icons.reply />
      <span >{replyCount}</span>
    </button>
  )
}

export default ReplyButton
