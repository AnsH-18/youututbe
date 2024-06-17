import React from 'react'

function UserDisplay(props) {
  return (
    <div className='flex items-center  gap-5 0 p-4 relative mb-5'>
        <img src={props.avatar} className='h-[60px] rounded-[25px]'></img>
        <div>
            <p className='font-bold text-lg'>{props.fullName}</p>
            <p className='text-gray-300'>@{props.userName}</p>
        </div>
        <div className='absolute right-4  h-full flex items-center'>
          <button className='px-4 h-8  bg-purple-800 text-white rounded-md hover:bg-black '>
            Subscribe
          </button>
        </div>
       
    </div>
  )
}

export default UserDisplay