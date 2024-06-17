import React from 'react'
import { timeAgo } from '../helper/formatdate';
import { Link } from 'react-router-dom';
import formatDuration from '../helper/formatVideoDuration';

function Video(props) {
  return (
    <Link to={`video/${props._id}`}>
      <div className='text-white w-100% h-fit -z-10'>
        <div className='relative'>
          <img src={props.thumbnail}></img>
          <div className='bg-black font-semibold h-fit w-fit absolute right-2 bottom-2 px-2'>{formatDuration(props.duration)}</div>
        </div>
        
        <div className='p-2 flex '>
          <div >
            <img src={props.author[0].avatar} className='h-10 rounded-2xl z-50'></img>
          </div>
          <div className='ml-5 text-sm text-gray-300'>
            <p className='font-bold '>{props.title}</p>
            <div className='flex gap-2'>
              <p className=''>{props.views} views</p>
              <p >{timeAgo(props.createdAt)}</p>
            </div>
            <p>{props.author[0].userName}</p>
          </div>
        </div>
    </div>
    </Link>
    
  )
}

export default Video