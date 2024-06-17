import React, { useEffect } from 'react'
import { timeAgo } from '../helper/formatdate'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
<<<<<<< HEAD
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
=======
>>>>>>> 5f9481b (made few changes)
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { toggleVideoLike,checkLikeStatus } from '../features/auth/likeSlice';

function VideoInfo(props) {
  const [videoLike, setVideoLike] = useState(props.liked)
  const dispatch = useDispatch()

console.log(props)
=======
import { toggleVideoLike, checkLikeStatus } from '../features/auth/likeSlice';
import { toggleSubscription } from '../features/auth/subscriberSlice';
import toast from 'react-hot-toast';
import { Modal } from '@mui/material';
import {Box} from '@mui/material';
import {Typography} from '@mui/material';
import SaveVideo from './SaveVideo';

function VideoInfo(props) {
  const [videoLike, setVideoLike] = useState(props.liked)
  const [channelSubscribed, setChannelSubscription] = useState(props.channelDetails?.isSubscribed)
  const dispatch = useDispatch()

  console.log(props)
>>>>>>> 5f9481b (made few changes)
  const patchVideoLike = (e) => {
    setVideoLike(prev => !prev)
    dispatch(toggleVideoLike(props.video?._id))

  }

<<<<<<< HEAD
  // console.log(videoLike)
  return (
    <div className='p-3 border-[1px] rounded-lg mb-3'>
    <p className= 'text-lg font-bold'>{props.video?.title}</p>
    <div className='flex gap-2 mb-3'>
      <p>{props.video?.views} Views</p>
      <p>{timeAgo(props.video?.createdAt)}</p>
    </div>
    <div className='flex justify-between pr-5 mb-6'>
      <div onClick={patchVideoLike} className=' h-8 w-20  border-[1px] rounded text-gray-200  border-gray-100 flex items-center px-5 gap-2'>
        {videoLike ?  <ThumbUpIcon fontSize='small' />:<ThumbUpAltOutlinedIcon fontSize='small' /> }
       
        <p >{props.video?.likesCount}</p>
      </div>
      <div>
        <button className='flex gap-2 bg-white text-black h-8 items-center px-3 rounded-lg'>
         <CreateNewFolderOutlinedIcon/>
         <p>Save</p>
        </button>
      </div>
    </div>
    <div className= 'flex justify-between pr-5 mb-5 '>
      <div className='flex gap-3'>
        <div>
          <img src= {props.video?.author[0].avatar} className='h-12 rounded-[30px]'></img>
        </div>
        <div>
          <p>{props.video?.author[0].userName}</p>
          <p className='text-gray-400 text-sm'>{props.channelDetails?.subscriberCount} Suscribers</p>
        </div>
      </div>
      <div>
        <button className='flex gap-2 bg-purple-500 text-black h-10 px-3 items-center font-bold'>
          <PersonAddOutlinedIcon/>
          <p>Subscribe</p>
        </button>
      </div>
    </div>
    <div className='border-t-[1px] border-gray-400 py-3 px-3'>
      <p>{props.video?.description}</p>
    </div>
  </div>
=======
  const patchChannelSubscription = () => {
    setChannelSubscription(prev => {
      prev ? toast.success("Channel Unsubcribed") : toast.success("Channel Subscribed")
      return !prev
    })
    dispatch(toggleSubscription(props.channelDetails?._id))
  }
 
  // console.log(videoLike)
  return (
    <div className='p-3 border-[1px] rounded-lg mb-3'>
      <p className='text-lg font-bold'>{props.video?.title}</p>
      <div className='flex gap-2 mb-3'>
        <p>{props.video?.views} Views</p>
        <p>{timeAgo(props.video?.createdAt)}</p>
      </div>
      <div className='flex justify-between pr-5 mb-6'>
        <div onClick={patchVideoLike} className=' h-8 w-20  border-[1px] rounded text-gray-200  border-gray-100 flex items-center px-5 gap-2'>
          {videoLike ? <ThumbUpIcon fontSize='small' /> : <ThumbUpAltOutlinedIcon fontSize='small' />}

          <p >{props.video?.likesCount}</p>
        </div>

        <SaveVideo />
      </div>
      <div className='flex justify-between pr-5 mb-5 '>
        <div className='flex gap-3'>
          <div>
            <img src={props.video?.author[0].avatar} className='h-12 rounded-[30px]'></img>
          </div>
          <div>
            <p>{props.video?.author[0].userName}</p>
            <p className='text-gray-400 text-sm'>{props.channelDetails?.subscriberCount} Suscribers</p>
          </div>
        </div>
        <div>
          <button onClick={patchChannelSubscription} className='flex gap-2 bg-purple-500 text-black h-10 px-3 items-center font-bold'>
            <PersonAddOutlinedIcon />
            {channelSubscribed ?
              <p>Subscribed</p> :
              <p>Subscribe</p>}
          </button>
        </div>
      </div>
      <div className='border-t-[1px] border-gray-400 py-3 px-3'>
        <p>{props.video?.description}</p>
      </div>

    </div>
>>>>>>> 5f9481b (made few changes)
  )
}

export default VideoInfo