import ReactPlayer from "react-player"
import React from 'react'

function VideoPlayer(props) {
  return (
    <div>
        <ReactPlayer url={props.videoFile}  width="640" height="480" controls></ReactPlayer>
    </div>
  )
}

export default VideoPlayer