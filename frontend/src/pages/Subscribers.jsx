import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { getChannelSubscribers } from '../features/auth/subscriberSlice'
import UserDisplay from '../components/UserDisplay'
import { useNavigate } from 'react-router-dom'
import Emptypage from './Emptypage'

function Subscribers() {
  const dispatch = useDispatch()
  const fetchedEmpty = useSelector(state => state.subscriber?.empty)
  const user = useSelector(state => state.auth)
  const subscriberList = useSelector(state => state.subscriber?.data)
  const userId = useSelector(state => state.auth?.data?._id)

  useEffect(() => {
    dispatch(getChannelSubscribers(userId)) 
  }, [])
  // console.log(subscriberList)
  return (
    <div  className='ml-2 text-white mt-24 sm:ml-60 mr-6 '>
      {fetchedEmpty? <Emptypage/>
       :
       <div>
          <div className='mb-6 ml-2'>
            <p className='text-2xl font-bold'>{user.data?.userName} Subscribers </p>
          </div>
          <div>
            {subscriberList?.map((subscriber) => {
              return <UserDisplay {...subscriber}></UserDisplay>
            })}
          </div>
       </div>
       
  }
    
    </div>
  )
}

export default Subscribers