import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom'

export default function OAuth() {
    const navigate = useNavigate()
    const dispatcher = useDispatch()

    const loading = false
    const handleGsignIn = async () => {
        try {

            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            console.log(result);
            const res = await fetch('/api/auth/gSignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, avatar: result.user.photoURL })
            })

            const data = await res.json()

            dispatcher(signInSuccess(data))
            console.log(data)
            navigate('/')

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <button type='button' onClick={handleGsignIn} disabled={loading} className='bg-red-800 text-white p-3 mt-2 rounded-2xl uppercase hover:opacity-90 disabled:opacity-75 flex gap-4 justify-center' >
            <span ><FcGoogle size={25} /></span>
            <span >{loading ? 'Please wait' : 'Sign in with Google'}</span>
        </button>)
}
