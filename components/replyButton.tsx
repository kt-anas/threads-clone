import { Icons } from '@/ui/Icons/users'
import React from 'react'

 interface replyButtonProps {
  replyCount: number
}
 
const ReplyButton: React.FC<replyButtonProps> = ({replyCount}) => {
  return (
    <button >
      <span>{replyCount}</span>
      <Icons.reply />
    </button>
  )
}

export default ReplyButton
