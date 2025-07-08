import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }


  return (
    <div className='p-7 flex flex-col h-screen'>
      <img className="w-16 mt-5 mb-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='logo'></img>
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }
        }>
          <h3 className='text-lg mb-2 font-semibold'>What's your name?</h3>
          <div className='flex justify-evenly gap-3'>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="first name"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2 text-lg mb-3 placeholder:text-base" />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="last name"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2 text-lg mb-3 placeholder:text-base" />
          </div>
          <h3
            className='text-lg mb-2 font-semibold'>What's your email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="email@example.com"
            className="bg-[#eeeeee] border px-2 py-2 rounded w-full text-lg mb-3 placeholder:text-base" />

          <h3 className='text-lg mb-2 font-semibold'>Enter your Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="bg-[#eeeeee] border px-2 py-2 rounded w-full text-lg mb-5 placeholder:text-base" />
          <button className='w-full bg-black text-white py-3 font-semibold rounded-lg mt-5'>Create Account</button>
          <p className='p-4 flex items-center justify-evenly'>Already have an account? <Link to={'/login'} className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] text-[#717171] leading-tight mt-24'>This site is protected by reCAPTCHA and the <span className='underline'>Google
          Policy</span> and <span className='underline'>Terms of Service apply</span> .</p>
      </div>
    </div>
  )
}

export default UserSignup
