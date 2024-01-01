import { useState } from 'react'
import MainPage from './pages/mainPage/MainPage'
// import BookReview from './pages/MainPage/BookReview/BookReview'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
 
  return (
    <>
     <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />}/>
          {/* <Route path='/:search' element={<BookReview />}/> */}
        </Routes>
      </Router>
      
     </div>
    </>
  )
}

export default App
