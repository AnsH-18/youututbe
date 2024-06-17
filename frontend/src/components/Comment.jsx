import React from 'react'
import { timeAgo } from '../helper/formatdate'

function Comment(props) {
  return (
    <div className='flex gap-3  px-2 py-4 border-b-[1px] border-gray-300'>
        <div>
            <img src={props.author[0]?.avatar} className='h-10 rounded-[40px]'></img>
        </div>
        <div>
            <div className='flex gap-2 text-gray-300'>
                <p>{props.author[0]?.fullName}</p>
                <p>{timeAgo(props.createdAt)}</p>
            </div>
            <div>
                <p className='text-gray-300'>@{props.author[0]?.userName}</p>
            </div>
            <div>
                <p>{props.content}</p>
            </div>
        </div>
    </div>
  )
}

export default Comment