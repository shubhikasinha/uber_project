import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptain] = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password: password
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/captain/login`, captain)

        if(response.status === 200){
            const token = response.data

            setCaptain(data.captain)
            localStorage.setItem('token', token)
            navigate('/captain-home')
            
        }
        else{
            console.log('Invalid email or password')
        setEmail('');
        setPassword('');
    }
}

    return (
        <div className='p-7 flex flex-col h-screen'>
            <img className="w-16 mt-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt='logo'></img>
            <div>
                <form onSubmit={(e) => {
                    submitHandler(e)
                }
                }>
                    <h3
                        className='text-lg mb-2 font-semibold'>Captain's email?</h3>
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
                    <button to='/login' className='w-full bg-black text-white py-3 font-semibold rounded-lg mt-5'>Continue</button>
                    <p className='p-4 flex items-center justify-evenly'>Want to join us? <Link to={'/captain-signup'}className='text-blue-600'>Register as a Captain</Link></p>
                </form>
            </div>
            <div>
                <Link to='/login' className='flex items-center justify-center  w-full bg-blue-900 text-white py-3 rounded-lg mt-36 mb-4 font-semibold'>Sign In as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin
