import React from 'react'
import style from './postBtn.module.scss'
interface PostBtnProps {
    onClick: () => void
}
const PostBtn: React.FC<PostBtnProps> = ({onClick}) => {

  return (
    <div className={style.postBtn} onClick={onClick}>
      Post
    </div>
  )
}

export default PostBtn
