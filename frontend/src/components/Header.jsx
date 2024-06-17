import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import iconSrc from '../helper/youtube-icon'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

function Header() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLoggedIn = useSelector(state => state.auth)

  return (
    <div className=' bg-[#121212] fixed top-0 left-0 right-0 h-20 border-gray-400 border-b-[1px] text-white flex justify-between items-center pr-8 pl-8 z-20'>
      <div>
      <img src={iconSrc}/>
      </div>
      <div className='sm:block hidden'>
        <input placeholder='Search' className='h-10 w-[300px] bg-inherit border-gray-400 border-[1px] pl-5'></input>
      </div>
      {userLoggedIn.status
      ? 
      <div className=' sm:block hidden'>
        <button className='border-2 border-black px-2 py-1 rounded bg-purple-600 text-black font-bold mr-4'>{userLoggedIn.data.userName}</button>
        <button onClick={() => dispatch(logoutUser())}>Log out</button>
      </div>
      :
      <div className='sm:block hidden'>
        <button onClick={() => navigate("/login")} className='mr-4'>Login</button>
        <button onClick={() => navigate("/register")} className='bg-purple-600 h-9 px-4 shadow shadow-gray-700 text-black font-bold'>Sign Up</button>
      </div>}
      <div className='sm:hidden flex gap-5'>
        <div>
          <SearchRoundedIcon/>
        </div>
        <div>
          <MenuRoundedIcon/>
        </div>
      </div>
    </div>
  )
}

export default Header