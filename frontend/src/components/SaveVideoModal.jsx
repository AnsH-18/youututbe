import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import {useDispatch,  useSelector } from "react-redux"
import { addVideoToPlaylist, createPlayListCall, makeDataNull } from '../features/playlistSlice';
import Playlist from './Playlist';
import { createPlayList } from '../../../Backend-Project/src/controllers/playlist.controller';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#000000',
  border: '2px solid #000',
  boxShadow: 24,
  color: "#ffffff",
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal(props) {
  const videoId = useSelector(state => state.video?.video?._id)
  const [input, setInput] = React.useState({name: "", description: ""})
  const playlistCreated = useSelector(state => state.playlist)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(createPlayListCall({name: input.name, description: input.description}))
    if(playlistCreated.playlist._id){
      dispatch(addVideoToPlaylist({playlistId: playlistCreated.playlist._id , videoId}))
      console.log("hehe")
    }
  }
  console.log(input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name] : value
      }
    });
  };

  useEffect(() => {
    const returnEvent = () =>  dispatch(makeDataNull())
    return returnEvent
  },[dispatch])
  

  return (
    <React.Fragment>
      <Modal
        open={props.opened}
        onClose={props.close}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} className= " sm:w-2/3 w-4/5 h-1/2">
        <div className='relative h-full'>
          <p className='mb-10 text-2xl'>Create playlist</p>
            <div className='flex flex-col gap-6'>
              <input name='name' onChange={handleChange} placeholder='Name' className='bg-inherit p-2 h-12 text-lg border-2 border-white'></input>
              <textarea name='description' onChange={handleChange} placeholder='Description'  className='bg-inherit p-2 h-28 text-lg border-2 border-white'></textarea>
            </div>
            <div>
              <button onClick={handleSubmit} className='h-fit w-fit px-4 py-3 text-md font-bold bg-purple-600 absolute right-3 bottom-3'>Create And Add the Video</button>
            </div>
        </div>
          
         
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function SaveVideoModal(props) {
    const [open, setOpen] = React.useState(false);
    const [PlaylistInfo, setPlaylist] = React.useState({playlist: {}, index: 0})
    const videoId = useSelector(state => state.video?.video?._id)
    const dispatch = useDispatch()
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    console.log(PlaylistInfo.playlist._id)
    const handlePlaylistSelect = (index) => {
      console.log(props.playlists[index])
      setPlaylist({
        playlist: props.playlists[index],
        index: index
      })
    }

    const handlePlaylistAdd = () => {
      dispatch(addVideoToPlaylist({playlistId: PlaylistInfo.playlist._id, videoId}))
    }
    
  return (
    <div >
      <Modal
        open={props.opened}
        onClose={props.close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}  className= " sm:w-2/3 w-4/5 h-2/3">
         <div className='h-full mb-5 flex flex-col justify-center   gap-5'>
            <div>
                <p className='text-2xl font-bold'>Save Video</p>
            </div>
            <div className=' flex  flex-col gap-5 h-3/4  overflow-x-hidden oerflow-y-auto'>
                {props.playlists?.map((playlist,index) => {
                  return <Playlist 
                    playlist = {playlist} 
                    index = {index} 
                    checkedIndex = {PlaylistInfo.index} 
                    selectPlaylist = {handlePlaylistSelect}
                    />
                })}
            </div>
            <div className='absolute bottom-5 right-5 flex gap-5 '>
                <button onClick={handleOpen} className='h-10 w-20 bg-gray-700'>Create</button>
                <button onClick={handlePlaylistAdd} className='h-10 w-20 bg-gray-700'>Done</button>
            </div>
         </div>
          
          <ChildModal opened = {open} close = {handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}
