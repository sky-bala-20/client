import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/UserDetails.css'

const UserDetails = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
    axios.get(`${API_URL}/api/user/${id}`)
      .then(response => {
        setUser(response.data)
        setError("")
        setLoading(false)
      })
      .catch((error) => {
        setError(`User not found: ${error.message}`)
        setLoading(false)
      })
  }, [id])

  const handleDelete = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
    try {
      await axios.delete(`${API_URL}/api/delete/${id}`)
      navigate('/')
    } catch (error) {
      setError(`Error occurred while deleting user: ${error.message}`)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      {error && <p className="error">{error}</p>}
      <h3>Name - {loading && <span className="loading">name is</span>} {user.name}</h3>
      <p>Email - {loading && <span className="loading">email is</span>} {user.email}</p>
      <p>Age - {loading && <span className="loading">age is</span>} {user.age}</p>
      <p>User Created at - {loading && <span className="loading">.....</span>}{formatDate(user.createdAt)}</p>
      <p>User Updated at - {loading && <span className="loading">.....</span>}{formatDate(user.updatedAt)}</p>
      <button onClick={handleDelete}>Delete User</button> &nbsp; &nbsp;
      <Link to={`/update-user/${id}`}>
        <button>Update User</button>
      </Link>
    </div>
  )
}

export default UserDetails