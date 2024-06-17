import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, getVideosofAUser, togglePublishedStatus, updateVideo, uploadVideo } from "../controllers/video.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const videoRouter = Router()


videoRouter.post("/upload-video", 
upload.fields([
    {
        name: "videoFile",
        maxCount: 1
    },{
        name: "thumbnail",
        maxCount: 1
    }
]),VerifyJWT, uploadVideo)

videoRouter.get("/get/:userid",VerifyJWT,  getVideosofAUser)
videoRouter.post("/toggle-publish-status",VerifyJWT, togglePublishedStatus)
videoRouter.patch("/update-video",upload.single("thumbnail"),VerifyJWT, updateVideo)
videoRouter.get("/videos/:videoid",VerifyJWT, getVideoById)
videoRouter.delete("/delete/:videoId",VerifyJWT, deleteVideo)
videoRouter.get("/get-all", getAllVideos)

export {videoRouter}