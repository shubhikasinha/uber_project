import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const captainData = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: Number(vehicleCapacity),
          vehicleType: vehicleType
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

      if (response.status === 201) {
        const token = response.data
        if (!token) {
          console.error('No token received from server')
          return
        }
        // Decode the JWT to get captain info
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        const captainData = JSON.parse(jsonPayload)
        
        setCaptain({ _id: captainData._id })
        localStorage.setItem('token', token)
        navigate('/captain-home')
        console.log('Captain account created successfully')
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message)
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(e => console.error(e.msg || e.message || e))
      }
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }


  return (
    <div className='p-7 flex flex-col h-screen'>
      <img className="w-16" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt='logo'></img>
      <div>
        <form onSubmit={(e) => {
          submitHandler(e)
        }
        }>
          <h3 className=' mb-2 font-semibold'>Captain's name?</h3>
          <div className='flex justify-evenly gap-3'>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
              placeholder="first name"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base" />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
              placeholder="last name"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base" />
          </div>
          <h3
            className=' mb-2 font-semibold'>Captain's email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="email@example.com"
            className="bg-[#eeeeee] border px-2 py-2 rounded w-full  mb-3 placeholder:text-base" />

          <h3 className=' mb-2 font-semibold'>Enter your Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="bg-[#eeeeee] border px-2 py-2 rounded w-full  mb-4 placeholder:text-base" />
          <h3 className=' mb-2 font-semibold'>Vehicle Information</h3>
          <div className='flex justify-evenly gap-3'>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              type="text"
              placeholder="vehicle colour"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base" />
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              type="integer"
              placeholder="vehicle capacity"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base" />
          </div>
          <div className='flex justify-evenly gap-3'>
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              type="text"
              placeholder="vehicle plate"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base" />
            
              <select
              required
              placeholder="vehicle type"
              className="bg-[#eeeeee] border px-2 py-2 rounded w-1/2  mb-3 placeholder:text-base text-gray-400"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled className="text-gray-400">vehicle type</option>
              <option className="text-black" value="car">Car</option>
              <option className="text-black" value="auto">Auto</option>
              <option className="text-black" value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <button to='/login' className='w-full bg-black text-white py-3 font-semibold rounded-lg mt-6'>Create Account</button>
          <p className='p-2 flex items-center justify-evenly font-semibold'>Already have an account? <Link to={'/captain-login'} className='text-blue-600'>Login Here</Link></p>
        </form>
      </div>
      <div>
        <p className='text-[8px] text-[#717171] leading-tight mt-9'>This site is protected by reCAPTCHA and the <span className='underline'>Google
          Policy</span> and <span className='underline'>Terms of Service apply</span> .</p>
      </div>
    </div>
  )
}

export default CaptainSignup
