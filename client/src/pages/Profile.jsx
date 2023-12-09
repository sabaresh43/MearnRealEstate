import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        My Profile
      </h1>

      <form className='flex flex-col gap-4'>
        <img className='rounded-full h-36 w-36 object-cover cursor-pointer self-center' src={currentUser.avatar} alt='profile' />
        <input type='text' placeholder='User name' className='border p-3 focus:outline-none rounded-lg' id='name'></input>
        <input type='email' placeholder='Email' className='border p-3 focus:outline-none rounded-lg' id='email'></input>
        <input type='password' placeholder='Password' className='border focus:outline-none p-3 rounded-lg' id='password'></input>
        <button className='bg-lime-500 p-3 rounded-2xl uppercase text-black font-semibold hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>

<div className='mt-4 justify-between flex'>
 <span className='text-red-700 hover:font-extrabold'> Delete Account</span>
 <span className='text-red-700 hover:font-extrabold'> Sign out</span>
</div>

    </div>
  )
}
