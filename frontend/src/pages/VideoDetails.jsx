import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { fetchVideoById, getAllVideos, makeVideoNull } from '../features/auth/videoSlice'
import { getChannelDetails, makeDetailsnull } from '../features/auth/userSlice'
import VideoListView from '../components/VideoListView'
import {getCommentsOfVideo } from '../features/auth/commentsSlice'
import Comment from '../components/Comment'
import VideoPlayer from '../components/VideoPlayer'
import VideoInfo from '../components/VideoInfo'
import VideoList from '../components/VideoList'
import CommentsList from '../components/CommentsList'
import { makeCommentNull } from '../features/auth/commentsSlice'
import { checkLikeStatus, makeNull } from '../features/auth/likeSlice'

function VideoDetails() {
    const params = useParams()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.data?._id)
    const video = useSelector(state => state.video?.video)

    const likedVideo = useSelector(state => state.video?.videoLiked)
    const channelDetails = useSelector(state => state.user?.data)
    const videos = useSelector(state => state.video?.data)
    const comments = useSelector(state => state.comment)
    window.scrollTo(top)

  console.log(likedVideo)
    useEffect(() => {
        dispatch(fetchVideoById(params.videoId))
        dispatch(getChannelDetails(video?.author[0].userName))
        dispatch(getAllVideos())
        dispatch(getCommentsOfVideo({videoId: params.videoId, page: 1}))
        const returnEvent = () => {
          dispatch(makeVideoNull())
          dispatch(makeCommentNull())
          dispatch(makeNull())
        }
        return returnEvent
    },[dispatch])

    // useEffect(() => {
    //   dispatch(getCommentsOfVideo(params.videoId))
    //   console.log("fetching new comments")
    // },[newComment])
  
  

  return (
    <div className='ml-2 text-white mt-20 sm:ml-56 lg:flex p-2 gap-3'>
      <div className='lg:w-2/3'>
          <VideoPlayer {...video} />
          <VideoInfo
              video = {video}
              channelDetails = {channelDetails} 
              userId = {userId}
              liked = {likedVideo}
          />

          {(!comments?.fetchedEmpty)
            &&
            <CommentsList 
              videoId = {params.videoId}
              comments = {comments}
            />
          }
      </div>

      {(!videos?.empty) 
        &&
        <VideoList {...videos}/>
      }
     
    
    </div>
  )
}

export default VideoDetails