import React from 'react'
import { useDispatch } from 'react-redux'
import {NavLink} from "react-router-dom"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

function Sidebar() {
  const dispatch = useDispatch()
  return (
    <div className='fixed sm:top-0 bottom-0 left-0 right-0 mt-[70px] bg-black z-10  sm:w-56 border-t-[1px] border-gray-400 sm:border-r-[1px]'>
      <div className=' hidden text-white sm:flex flex-col gap-3 px-2 py-4'>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <HomeOutlinedIcon fontSize='medium'/>
              <p>Home</p>
            </div>
          </NavLink>
        <NavLink
          to="likedVideos"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <ThumbUpAltOutlinedIcon fontSize='small'/>
              <p>Liked Videos</p>
            </div>
          </NavLink>
        <NavLink
          to="watchHistory"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <HistoryOutlinedIcon fon/>
              <p>History</p>
            </div>
          </NavLink>
        <NavLink
          to="subscribersList"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <GroupOutlinedIcon/>
              <p>Subscribers</p>
            </div>
          </NavLink>
        <NavLink
          to="mycontent"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <VideocamOutlinedIcon/>
              <p>My content</p>
            </div>
          </NavLink>
        <NavLink
          to="collections"
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? "#9333EA"
              : "inherit",
          })}>
            <div className="flex items-center gap-2 border-[1px] border-gray-400 py-[5px] px-4 hover:bg-purple-600 hover:text-black">
              <FolderOpenOutlinedIcon/>
              <p>Collections</p>
            </div>
          </NavLink>
       
        
      </div>
      <div className='sm:hidden  h-16 flex justify-between  gap-2 items-center px-5 py-5'>
      <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive
              ? "#9333EA"
              : "white",
          })}>
            <div className="flex flex-col justify-center items-center">
              <HomeOutlinedIcon/>
              <p>Home</p>
            </div>
          </NavLink>
      <NavLink
          to="watchHistory"
          style={({ isActive }) => ({
            color: isActive
              ? "#9333EA"
              : "white",
          })}>
            <div className="flex flex-col justify-center items-center">
              <HistoryOutlinedIcon/>
              <p>History</p>
            </div>
          </NavLink>
      <NavLink
          to="collections"
          style={({ isActive }) => ({
            color: isActive
              ? "#9333EA"
              : "white",
          })}>
            <div className="flex flex-col justify-center items-center">
              <FolderOpenOutlinedIcon/>
              <p>Collections</p>
            </div>
          </NavLink>
      <NavLink
          to="subscribersList"
          style={({ isActive }) => ({
            color: isActive
              ? "#9333EA"
              : "white",
          })}>
            <div className="flex flex-col justify-center items-center">
              <GroupOutlinedIcon/>
              <p>Subscribers</p>
            </div>
          </NavLink>
        
      </div>
    </div>
    
  )
}

export default Sidebar