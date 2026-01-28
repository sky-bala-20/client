import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../style/AllUsers.css'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
    axios.get(`${API_URL}/api/users`)
      .then((response) => {
        setUsers(response.data)
        setError("")
        setLoading(false)
      })
      .catch((error) => {
        setError(`Error fetching users: ${error.message}`)
        setLoading(false)
      })
  }, [])

  return (
    <div className="all-users-container">
      <h1>All Candidate</h1>
      {/* <Link to='/create-user'>Create User</Link> */}
      {loading && <p className="loading">loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <p className="no-users">No Users Available</p>
          ) : (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user._id}>
                  <Link to={`/user-details/${user._id}`}>
                    {user.name} - Click here to see
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export default AllUsers