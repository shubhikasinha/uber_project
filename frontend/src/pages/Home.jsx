import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className='h-screen w-full flex justify-between flex-col bg-[url("/images/home.png")] bg-cover bg-center'>
            <img className="w-16 ml-8 mt-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='logo'></img>
            <div className='bg-white py-4 px-4 pb-7'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    )
}

export default Home
