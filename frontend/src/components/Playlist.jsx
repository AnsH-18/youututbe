import React from 'react'

function Playlist(props) {
  return (
    <div onClick={() => props.selectPlaylist(props.index)} className='border-2 bg-[#1C1C1C]  border-white md:flex flex-row gap-4 relative'>
        <div>
            <img src={props.playlist?.firstThumbnail} className='h-40 w-full'></img>
        </div>
        <div className='flex flex-col mt-4 ml-5 mb-4'>
            <p className='text-2xl font-bold'>{props.playlist.name}</p>
            <p>{props.playlist.videos?.length} Videos</p>
        </div>
        <div className='absolute top-5 right-5'>
            <input name='checkbox' type='checkBox' className='h-8' checked = {props.checkedIndex === props.index? true : false}></input>
        </div>

    </div>
  )
}

export default Playlist