import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }


  return (
    <div className='p-7 flex flex-col h-screen'>
      <img className="w-16 mt-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt='logo'></img>
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }
        }>
          <h3 className='text-lg mb-2 font-semibold'>Captain's name?</h3>
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
            className='text-lg mb-2 font-semibold'>Captain's email?</h3>
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
          <button to='/login' className='w-full bg-black text-white py-3 font-semibold rounded-lg mt-5'>Continue</button>
          <p className='p-4 flex items-center justify-evenly'>Already have an account? <Link to={'/captain-login'} className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[10px] text-[#717171] leading-tight mt-24'>This site is protected by reCAPTCHA and the <span className='underline'>Google
        Policy</span> and <span className='underline'>Terms of Service apply</span> .</p>
      </div>
    </div>
  )
}

export default CaptainSignup
