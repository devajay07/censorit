import React from "react"
import Header from "./components/Header"
import './style.scss'
import Footer from "./components/Footer"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feedback from "./components/Feedback";
import About from "./components/About"
function App() {

  return (
    <div className="main">
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
