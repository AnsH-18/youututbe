import asyncHandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiErrors.js"
import { Like } from "../models/like.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import mongoose from "mongoose"


const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.query
    const user = req.user

    if(!videoId){
        throw new ApiError(402, "Video Details cannot be fetched")
    }

    const alreadyLiked = await Like.findOne({video: videoId, likedBy: user?._id}) 
    console.log(alreadyLiked)

    if(alreadyLiked){
        const deleteLikeByThisUser = await Like.findOneAndDelete({video: videoId, likedBy: user?._id})
        if(!deleteLikeByThisUser){
            throw new ApiError(401, "Cannot unlike this video")
        }
        return res.status(200).json(
            new ApiResponse(200, false, "Like removed Successfully")
        )
    }
    else{
        const addLikeByThisUser = await Like.create({
            video: videoId,
            likedBy: user?._id,
        })

        if(!addLikeByThisUser){
            throw new ApiError(402, "Cannot like this video")
        }
        return res.status(200).json(
            new ApiResponse(200, true, "Like added Successfully")
        )
    }

})


const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.query
    const user = req.user

    if(!commentId){
        throw new ApiError(402, "comment details cannot be fetched")
    }

    const alreadyLiked = await Like.findOne({comment: commentId, likedBy: user?._id}) 

    if(alreadyLiked){
        const deleteLikeByThisUser = await Like.findOneAndDelete({comment: commentId, likedBy: user?._id})
        if(!deleteLikeByThisUser){
            throw new ApiError(401, "Cannot unlike this comment")
        }
        return res.status(200).json(
            new ApiResponse(200, {}, "Like removed Successfully")
        )
    }
    else{
        const addLikeByThisUser = await Like.create({
            comment: commentId,
            likedBy: user?._id,
        })

        if(!addLikeByThisUser){
            throw new ApiError(402, "Cannot like this comment")
        }
        return res.status(200).json(
            new ApiResponse(200, {}, "Like added Successfully")
        )
    }
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.query
    const user = req.user

    if(!tweetId){
        throw new ApiError(402, "Tweet details cannot be fetched")
    }

    const alreadyLiked = await Like.findOne({tweet: tweetId, likedBy: user?._id}) 

    if(alreadyLiked){
        const deleteLikeByThisUser = await Like.findOneAndDelete({tweet: tweetId, likedBy: user?._id})
        if(!deleteLikeByThisUser){
            throw new ApiError(401, "Cannot unlike this tweet")
        }
        return res.status(200).json(
            new ApiResponse(200, {}, "Like removed Successfully")
        )
    }
    else{
        const addLikeByThisUser = await Like.create({
            tweet: tweetId,
            likedBy: user?._id,
        })

        if(!addLikeByThisUser){
            throw new ApiError(402, "Cannot like this tweet")
        }
        return res.status(200).json(
            new ApiResponse(200, {}, "Like added Successfully")
        )
    }
})


const getLikedVideos = asyncHandler(async (req, res) => {
    const user = req.user

    const likedVideos = await Like.aggregate([
        {$match: {
            likedBy: new mongoose.Types.ObjectId(user?._id),
            video: { $exists: true },
          },
        },
        {$lookup: {
            from: "videos",
            localField: "video",
            foreignField: "_id",
            as: "likedVideo",
            pipeline: [{
                $lookup: {
                  from: "users",
                  localField: "owner",
                  foreignField: "_id",
                  as: "author",
                  pipeline: [{
                      $project: {
                        userName: 1,
                        fullName: 1,
                        avatar: 1,
                      },
                    },
                  ],
                },
              }
            ],
          },
        },
        {$unwind: "$likedVideo"},
       {$group: {
        _id: "$likedBy",
        videos: {$push: "$likedVideo"}
       }}
      ]);
      
      
        // {$group: {
        //     _id: "$likedBy",
        //     likedVideos: {
        //         $push: {
        //             video: "$likedVideo._id",
        //             videoFile: "$likedVideo.videoFile",
        //             thumbnail: "$likedVideo.thumbnail",
        //             owner: "$author",
        //             duration: "$likedVideo.duration",
        //             views: "$likedVideo.views"
        //         }
        //     }
        // }}
  

    // const likedVideos = await Like.aggregate([
    //     {$match: {likedBy: new mongoose.Types.ObjectId(user?._id), video: {$exists: true}}},
    //     {$lookup: {
    //         from: "videos",
    //         localField: "video",
    //         foreignField: "_id",
    //         as: "likedVideo"
    //     }}
    // ])

    return res.status(200).json(
        new ApiResponse(200, likedVideos, "Liked Videos Fetched Successfully")
    )
})

const getVideoLikeStatus = asyncHandler(async (req, res) => {
    const {videoId, userId} = req.query

    const checkLike = await Like.findOne({video: videoId, likedBy: userId})

    if(!checkLike){
        return res.status(200). json(
            new ApiResponse(200, false, "not liked by this user")
        )
    }
    return res.status(200). json(
        new ApiResponse(200, true, "liked by this user")
    )
})

export {
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
    getLikedVideos,
    getVideoLikeStatus
}