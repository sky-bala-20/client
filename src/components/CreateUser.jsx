import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../style/Form.css'

const CreateUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const API_URL = import.meta.env.VITE_API_URL || 'https://my-user-backend.onrender.com'
    try {
      await axios.post(`${API_URL}/api/create`, { name, email, age })
      setMessage("User created successfully")
      setError("")
      setName("")
      setEmail("")
      setAge("")
      navigate('/')
    } catch (error) {
      setError(`User creation failed ${error.message}`)
    }
  }

  return (
    <div className="form-container">
      <h2>Create a new user</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
        <br/><br/>
        <label>Email: </label>
        <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <br/><br/>
        <label>Age: </label>
        <input 
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
        />
        <br/><br/>
        <button type="submit">Create User</button>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </form>
    </div>
  )
}

export default CreateUser