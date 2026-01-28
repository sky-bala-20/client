import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
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

  // Function to chunk users into groups of 5 for slides
  const chunkUsers = (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size))
    }
    return chunks
  }

  const userChunks = chunkUsers(users, 5)

  return (
    <div className="all-users-container">
      <h1>All Candidates</h1>
      {loading && <p className="loading">loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          {users.length === 0 ? (
            <p className="no-users">No Users Available</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="user-swiper"
            >
              {userChunks.map((chunk, index) => (
                <SwiperSlide key={index} className="user-slide">
                  <ul className="user-list">
                    {chunk.map((user) => (
                      <li key={user._id} className="user-item">
                        <Link to={`/user-details/${user._id}`}>
                          {user.name} - Click here to see
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </div>
  )
}

export default AllUsers