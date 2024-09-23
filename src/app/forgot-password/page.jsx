'use client'
import React, { useRef, useState } from 'react'

const Page = () => {
  const [emailError,setEmailError] = useState(false)
  const email = useRef('');
  const sendOtp = ()=>{

  }
  return (
    <div className='min-h-screen flex justify-center items-center bg-white text-black'>
      <div className='flex flex-col rounded-md overflow-hidden w-1/5 shadow-2xl'>
        <div className='flex justify-start items-center bg-[#01008A] p-5 px-10 text-white font-bold'>Forgot Password</div>
        <div className='px-10 py-8 flex flex-col justify-start items-center gap-5'>
            <div className='flex flex-col gap-2 justify-center items-start w-full'>
              <p>Email address</p>
              <input placeholder='Enter email address' ref={email} className='border rounded-md p-2 w-full'/>
              {emailError && <p className='text-[#F00] text-[11px]'>Please enter valid email id</p>}
            </div>
            <button className='w-full p-2 text-white bg-[#01008A] rounded-md' onClick={()=>sendOtp()}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Page