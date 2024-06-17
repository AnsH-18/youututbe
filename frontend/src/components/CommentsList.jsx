import React, { useState } from 'react'
import { addComment,getCommentsOfVideo } from '../features/auth/commentsSlice'
import Comment from './Comment'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

function CommentsList(props) {
  console.log(props)
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState("")
  const [commentPage, setCommentPage] = useState(2)

  const handleCommentInput = (e) => {
    setNewComment(e.target.value)
  }
  const handleCommentSubmit = () => {
    setNewComment("")
    dispatch(addComment({videoId: props.videoId, content: newComment}))
    // dispatch(getCommentsOfVideo({videoId: props.videoId, page: 1}))
  }

  const handleMoreComments = () => {
    if(props.comments?.totalCount === props.comments?.data.length){
      toast("No more Comments")
      return
    }
    dispatch(getCommentsOfVideo({videoId: props.videoId, page: commentPage}))
    setCommentPage(prev => prev + 1)
    console.log(commentPage)
  }
console.log(props.comments)
  return (
    <div className= 'border-[1px] border-gray-300 p-3 rounded-lg'>
    <div className='flex flex-col items-center gap-3 mb-3'>
      <p className='font-bold text-lg'>{props.comments?.totalCount} comments</p>
      <input value={newComment} onChange={handleCommentInput} placeholder='Add a Comment' className='w-full h-8 bg-inherit rounded py-3 px-3 text-sm border-[1px] border-gray-300'></input>
      <button className='h-8 w-16 bg-purple-600' onClick={handleCommentSubmit}>Add</button>
    </div>

    <div>
      {props.comments?.data?.map((commentinfo) => {
        return <Comment {...commentinfo}></Comment>
      })}
    </div>
    <div className='flex justify-center items-center my-1 mt-4'>
      <button onClick={handleMoreComments} className='w-32 h-10 bg-purple-600 text-black font-bold'>Load More</button>
    </div>
  </div>
  )
}

export default CommentsList