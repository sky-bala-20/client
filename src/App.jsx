import React from 'react'
import { Routes, Route} from "react-router-dom";
import CreateUser from "./components/CreateUser";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import UpdateUser from "./components/UpdateUser";
import UserDetails from "./components/UserDetails";
import AllUsers from './components/AllUsers';

const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <Routes>
        <Route path="/" element={<AllUsers/>} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer/>
      
    </div>
  )
}

export default App