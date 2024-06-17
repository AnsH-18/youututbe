import React from 'react'
import { timeAgo } from '../helper/formatdate'
import formatDuration from '../helper/formatVideoDuration'

function VideoListView(props) {
  return (
    <div className='flex mb-3 border border-[1px] border-gray-100 gap-2'>
        <div className='relative'>
            <img src = {props.thumbnail} className='h-full w-40'></img>
            <div className='absolute right-5 bottom-1 bg-black flex items-center justify-center px-[5px]'><p>{formatDuration(props.duration)}</p></div>
        </div>
        <div className='p-2'>
            <p className='mb-2'>{props.title}</p>
            <p className='text-gray-300 text-md'>{props.author[0].userName}</p>
            <div className='flex text-gray-300 gap-2 text-sm'>
                <p>{props.views} Views</p>
                <p >{timeAgo(props.createdAt)}</p>
            </div>
        </div>
    </div>
  )
}

export default VideoListView