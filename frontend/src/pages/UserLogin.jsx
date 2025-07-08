import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                email: email,
                password: password
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
            console.log('Response status:', response.status)

            if (response.status === 200) {
                const token = response.data
                if (!token) {
                    console.error('No token received from server')
                    return
                }
                // Decode the JWT to get user info
                const base64Url = token.split('.')[1]
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                }).join(''))
                const userData = JSON.parse(jsonPayload)
                
                setUser({ _id: userData._id })
                localStorage.setItem('token', token)
                navigate('/home')
                console.log('Token set successfully')
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message)
        }

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
                    <h3
                        className='text-lg mb-2 font-semibold'>What's your email?</h3>
                    <input
                        required
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button to='/login' className='w-full bg-black text-white py-3 font-semibold rounded-lg mt-5'>Login</button>
                    <p className='p-4 flex items-center justify-evenly'>New Here? <Link to={'/signup'} className='text-blue-600'>Create New Account</Link></p>
                </form>
            </div>
            <div>
                <Link to='/captain-login' className='flex items-center justify-center  w-full font-semibold bg-green-600 text-white py-3 rounded-lg mt-36 mb-4'>Sign In as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin
