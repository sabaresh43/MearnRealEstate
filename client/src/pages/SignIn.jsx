import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx'

export default function SignIn() {

  const [formData, setData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatcher = useDispatch()

  const handleChanges = (e) => {
    setData({
      ...formData, [e.target.id]: e.target.value
    })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    dispatcher(signInStart)

    e.preventDefault();
    console.log("finalldaataa", formData)

    try {

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatcher(signInFailure(data.message))

        return
      }
      dispatcher(signInSuccess(data))
      navigate('/home')

    } catch (err) {
      dispatcher(signInFailure(err.message))
    }

  }




  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input placeholder='Email' id='email' type='email' className='border rounded-lg p-3 focus:outline-none' onChange={handleChanges}></input>
        <input placeholder='Password' id='password' type='password' className='border rounded-lg p-3 focus:outline-none' onChange={handleChanges}></input>
        <button disabled={loading} className='mt-5 bg-slate-700 text-center uppercase rounded-xl text-white p-3 hover:opacity-90 disabled:opacity-75' onChange={handleChanges}> {loading ? 'Please wait' : 'Sign In'}</button>
        <OAuth></OAuth>
        <Link className='flex gap-2 mt-3' to={'/sign-up'}>
          Not Registered?
          <span className='text-blue-900'>
            Sign up!</span></Link>
      </form>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
