import React from 'react'
import { Link } from 'react-router-dom'
import '../style/ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for is either unavailable or does not exist.
      </p>
      <Link to="/" >
        Go back to Home
      </Link>
    </div>
  )
}

export default ErrorPage