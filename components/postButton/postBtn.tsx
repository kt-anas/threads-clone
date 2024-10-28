import React from 'react'
import style from './postBtn.module.scss'
import { openModal } from '@/store/modalSlice'
import { useAppDispatch } from '@/lib/hooks'
 
const PostBtn: React.FC = () => {
    const dispatch = useAppDispatch()

  return (
    <div className={style.postBtn} onClick={ () => dispatch(openModal())}>
      Post
    </div>
  )
}

export default PostBtn
