import React, { useEffect } from 'react'
import CaptainDataContext from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captainData, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token])

    axios.get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if(response.status === 200){
            setUser(response.data.captain)
            setIsLoading(false)
        }
    })

        .catch(err => {
            console.log(err)
            localStorage.removeItem('token')
            navigate('/captain-login')
    })
    
    if(isLoading){
        return <div>Loading...</div>
    }
    
    if (!token) {
        return null
    }
    
    return (
        <div>
            {children}
        </div>
    )
}

export default CaptainProtectWrapper
