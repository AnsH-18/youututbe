import React, { useEffect } from 'react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SaveVideoModal from './SaveVideoModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlaylistOfAUser } from '../features/playlistSlice';


function SaveVideo() {
    const [open, setOpen] = useState(false)
    const playlistData = useSelector(state => state.playlist) 
    const dispatch = useDispatch()
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      useEffect(() => {
        dispatch(getAllPlaylistOfAUser())
        console.log("hell")
    }, [dispatch])
  return (
    <div >
          <button onClick={handleOpen} className='flex gap-2 bg-white text-black h-8 items-center px-3 rounded-lg'>
            <CreateNewFolderOutlinedIcon />
            <p>Save</p>
          </button>
          <SaveVideoModal 
            opened = {open} 
            close = {handleClose} 
            handleOpen = {handleClose}
            playlists ={playlistData.playlists}
            empty = {playlistData.empty}/>
    </div>
  )
}

export default SaveVideo