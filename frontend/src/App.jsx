import { useState } from 'react'
import './App.css'
import {Routes, BrowserRouter, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Protected from './Routes/Protected'
import Home from './pages/Home'
import VideoGrid from './components/VideoGrid'
import LikedVideos from './pages/LikedVideos'
import Subscribers from './pages/Subscribers'
import WatchHistory from './pages/History'
import Test from './pages/Test'
import VideoDetails from './pages/VideoDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<VideoGrid/>}></Route>

          <Route path='likedVideos' element={
            <Protected>
              <LikedVideos/>
            </Protected>
          }>
          </Route>

          <Route path='watchHistory' element={
            <Protected>
              <WatchHistory/>
            </Protected>
          }>
        </Route>

          <Route path='subscribersList' element={
            <Protected>
              <Subscribers/>
            </Protected>
          }>
        </Route>

        <Route path='video/:videoId' element={
          <Protected>
            <VideoDetails/> 
          </Protected>
          }>
        </Route> 

        </Route>
        <Route path='/register' element= {<Register/>}></Route>
        <Route path='/login' element= {<Login/>}></Route>
      
          <Route path='/test' element={<Protected><Test/></Protected>}></Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default App
