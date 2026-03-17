// // import { BrowserRouter, Route, Routes } from 'react-router-dom'
// // import './index.css'
// // import Register from './Pages/Register'
// // import Home from './Pages/Home'
// // import Movies from './Pages/movies'
// // function App() {
 

// //   return (
// //     <>
// //     <BrowserRouter>
// //       <Movies/>
// //       <Routes>
// //         <Route path='/home' element={<Home/>}/>
// //         <Route path='/' element={<Register/>}/>
// //       </Routes>
// //     </BrowserRouter>
// //     </>
      
// //   )
// // }

// // export default App
// import { BrowserRouter,Routes,Route } from "react-router-dom"
// import Movies from "./Pages/movies"
// import MovieCard from "./Pages/movieDetails"
// import Navbar from "./Component/Navbar"
// import LoginPage from "./Pages/login"

// function App(){

// return(

// <BrowserRouter>
// <Navbar/>
// <Routes>

// <Route path="/" element={<Movies/>} />
// <Route path="/login" element={<LoginPage/>} />

// <Route path="/movie/:id" element={<MovieCard/>} />

// </Routes>

// </BrowserRouter>

// )

// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Movies from "./Pages/movies"
import MovieDetails from "./Pages/movieDetails"
import LoginPage from "./Pages/login"
import PrivateRoute from "./Component/types/PriviateRoute"
import Register from "./Pages/Register"
import FavoritesPage from "./Pages/FavoritesPage"
import TopRatedPage from "./Pages/TopR"
import Popular from "./Pages/Popular"
// import SideBar from "./Component/sideBar"
import Navbar from "./Component/Navbar"

function App() {

  return (
 
    <BrowserRouter>
      <Navbar/>
      <div className="">
        <Routes>
          {/* Login Page مفتوحة للجميع */}
          <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />

          {/* صفحات محمية */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
          <Route
            path="/popular"
            element={
              <PrivateRoute>
                <Popular />
              </PrivateRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <PrivateRoute>
                <MovieDetails />
              </PrivateRoute>
            }
          />
          <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
<Route path="/top-rated" element={<PrivateRoute><TopRatedPage /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App