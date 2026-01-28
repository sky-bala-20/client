import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../style/Form.css'

const UpdateUser = () => {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
      try {
        const response = await axios.get(`${API_URL}/api/user/${id}`)
        setName(response.data.name)
        setEmail(response.data.email)
        setAge(response.data.age)
        setError("")
      } catch (error) {
        setError(`Error fetching user: ${error.message}`)
      }
    }
    fetchUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
    try {
      await axios.put(`${API_URL}/api/edit/${id}`, { name, email, age })
      setMessage("User updated successfully...")
      setError("")
      setName("")
      setEmail("")
      setAge("")
      navigate('/')
    } catch (error) {
      setError(`User update failed ${error.message}`)
    }
  }

  return (
    <div className="form-container">
      <h2>Update User</h2>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <label>Age: </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Update User</button>
      </form>
    </div>
  )
}

export default UpdateUser