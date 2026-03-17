import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {  Home, Play,Search,LogOut,LogIn,SignalIcon, HeartIcon, Star } from "lucide-react";
import {  Tv } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    navigate("/login")
  }
  const handleClick = () => {
    window.scrollTo({
      top: 0,     
      behavior: "smooth" 
    })
  }
  return (
 <nav className="bg-black/70  text-white px-4 py-6 flex justify-between items-center shadow-md fixed w-full z-50">
  
    <div className="text-2xl flex justify-center items-center font-bold cursor-pointer" onClick={()=>navigate("/")}>
        Alisson Movies<span><Tv/></span>    
    </div>
      
   <div className="hidden md:flex gap-6 items-center">
        {isLoggedIn ? (
          <>
        <button className="hover:text-red-500 transition" onClick={()=>navigate("/")}>Home</button>
        <button className="hover:text-red-500 transition"onClick={()=>navigate('/popular')}>Popular</button>
        <button className="hover:text-red-500 transition" onClick={()=>navigate("/favorites")}>Favorites</button>
        <button className="hover:text-red-500 transition" onClick={()=>navigate("/top-rated")}>Top Rated</button>
          <button className="bg-red-600 px-2 py-1 rounded-lg
           hover:bg-red-700 transition" onClick={handleLogout}>
            <LogOut size={24} />
          </button>
      </>  ) : (<>
          <button
            className="bg-red-600 px-2 py-1 rounded-lg hover:bg-red-700 transition"
            onClick={()=>navigate("/login")} >
            <LogIn size={24} />
          </button>
          <button
            className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 transition"
            onClick={()=>navigate("/register")}
          >
            <SignalIcon size={24} />
          </button>
</>
        )}
      </div>

    <aside className="fixed flex md:hidden  bottom-0 left-0 w-full h-16 bg-black/90 backdrop-blur-md border-t border-white/10 flex flex-row items-center justify-around px-4 z-50 
          md:top-0 md:left-0 md:h-screen md:w-20 md:flex-col md:border-t-0 md:border-r md:py-8">
      
      {/* Logo - Hidden on mobile */}
      <div className="hidden md:block text-red-600 mb-12">
        <Play size={32} fill="currentColor" />
      </div>

      {/* Navigation Icons */}
      <nav className="flex flex-row md:flex-col gap-4 sm:gap-8 justify-around w-full md:w-auto items-center">
        <button className="text-gray-400 hover:text-white p-2" onClick={handleClick}>
          <Search size={24} />
        </button>
        <button  onClick={()=>navigate("/")} className="text-white bg-red-600/20 md:bg-white/10 p-2 sm:p-3 rounded-xl border border-red-500/50 md:border-white/20">
          <Home size={24} />
        </button>
        <button  onClick={()=>navigate("/favorites")} className="text-gray-400 hover:text-white p-2">
          <HeartIcon size={24} />
        </button>
        <button  onClick={()=>navigate("/top-rated")} className="text-gray-400 hover:text-white p-2">
          <Star size={24} />
        </button>
      </nav>
      {isLoggedIn?
         <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2">
          <LogOut size={24} />
        </button>
:<>
        <button onClick={()=>navigate('/login')} className="text-gray-400 hover:text-white p-2">
          <LogIn size={24} />
        </button>
        <button onClick={()=>navigate('/register')} className="text-gray-400 hover:text-white p-2">
          <SignalIcon size={24} />
        </button>
</>}
    </aside>
    </nav>
  )
}