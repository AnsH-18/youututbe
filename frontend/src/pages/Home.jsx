import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import {Outlet} from 'react-router-dom'

function Home() {

  const userInfo = useSelector(state => state.auth.data)

  return (
  
    <div className='h-[2000px]'>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Home