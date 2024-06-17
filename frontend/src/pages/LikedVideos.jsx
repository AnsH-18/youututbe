import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { getLikedVideosByUser } from '../features/auth/videoSlice'
import Video from '../components/Video'
import Emptypage from './Emptypage'

function LikedVideos() {
  const Videos = useSelector(state => state.video?.data)
  const fetchedEmpty = useSelector(state => state.video?.empty)
  const dispatch = useDispatch()

  console.log(fetchedEmpty)
  useEffect(() => {

    dispatch(getLikedVideosByUser())
  }, [])
  
  return (
    
    <div className='ml-2 text-white mt-20 sm:ml-56 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 p-2'>
      {fetchedEmpty?
       <Emptypage></Emptypage>
      :
      Videos?.map((video) => {
        return <Video {...video}></Video>
      })}
      
    </div>
  )
}

export default LikedVideos