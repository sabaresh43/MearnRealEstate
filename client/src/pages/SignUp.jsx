import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {

  const [formData, setFormdata] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormdata({
      ...formData, [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate('/sign-in')
    } catch (err) {
      console.log(err)
      setLoading(false)
      setError(err.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='User Name' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={handleChange} />
        <input type="email" placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 mt-4 rounded-2xl uppercase hover:opacity-90 disabled:opacity-75'
        >{loading ? 'Please wait' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Already having an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-800'>SignIn</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>

  )
}
