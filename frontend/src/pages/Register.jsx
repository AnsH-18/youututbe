import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, toggleSuccess } from '../features/auth/authSlice'
import toast from 'react-hot-toast'

function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector(state => state.auth)

  const [input, setInput] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "",
    coverImage: ""
  })

  const handleInput = (e) => {
      const {name, value, type} = e.target
      setInput(input => {
         if(type != 'file') return {
            ...input,
            [name]: value
          }
          else{
            return{
              ...input,
              [name]: e.target.files[0]
            }
          }
      })
  }

  const handleSubmit = () => {
    //don't set auth state 
    try {
      if(!input.userName || !input.fullName || !input.email || !input.password || !input.avatar || !input.coverImage){
        toast.error("All fields are required")
        return
      }
      
      dispatch(registerUser(input))
    
    } catch (error) {
      console.log(error)

    }
  }

  if(state.success){
    dispatch(toggleSuccess())
    navigate("/login")
  }

  return (
    <div className=' h-screen flex  justify-center pt-[40px] ]'>
      <div className=' w-3/4 sm:w-2/3 lg:w-1/4 flex flex-col gap-3 '>
        <div className='flex justify-center'><p className='text-white font-bold text-[30px] mb-[20px]'>Sign Up</p></div>
        <div className='flex flex-col'>
          <label className='text-white' htmlFor='userName'>UserName</label>
          <input onChange={handleInput} placeholder='username' className='rounded h-10 p-2 text-white bg-inherit border border-solid border-1 ' name='userName'></input>
        </div>

        <div className='flex flex-col gap-1'>      
          <label className='text-white' htmlFor='fullName'>Full Name</label>
          <input onChange={handleInput} placeholder='fullname' className='rounded h-10 p-2 bg-inherit text-white border border-solid border-1 ' name='fullName'></input>
        </div>

        <div className='flex flex-col'>
          <label className='text-white' htmlFor='email'>Email</label>
          <input onChange={handleInput} placeholder='email' className='rounded h-10 p-2 text-white bg-inherit border border-solid border-1 ' name='email'></input>
        </div>

        <div className='flex flex-col'>
          <label className='text-white' htmlFor='password'>Password</label>
          <input onChange={handleInput} placeholder='password' type='password' className='rounded h-10 p-2 text-white bg-inherit border border-solid border-1 ' name='password'></input>
        </div>

        <div className='flex flex-col'>
          <label className='text-white' htmlFor='avatar'>Avatar</label>
          <input onChange={handleInput} name='avatar' type='file' className='text-white'></input>
        </div>

        <div className='flex flex-col'>
          <label className='text-white' htmlFor='coverImage'>Cover Image</label>
          <input onChange={handleInput} name='coverImage' type='file' className='text-white '></input>
        </div>
        <div className='flex justify-center'>
          <button onClick={handleSubmit} className='h-10 w-full bg-purple-600 text-white font-semibold '>Register</button>
        </div>
        <div><p className='text-white '>Already have an Account <span onClick={()=> navigate("/login")} className='text-purple-600 underline hover:cursor-pointer'>Login</span></p></div>
      </div>
      
      
      
    </div>
  )
}

export default Register