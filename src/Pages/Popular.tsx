import { useEffect, useState } from "react"
import type{ Movie } from "../Component/types/movi"
import axios from "axios"
import MovieCard from "../Component/moviecard"


export default function(){
const [popularMovies,setPopularMovies]=useState<Movie[]>([])

async function fetchPopularMovies() {
   const res=await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=a189e8cf6bbef5b777e34a66fc3cd75b")
   setPopularMovies(res.data)
  }
  useEffect(()=>{
    fetchPopularMovies()
  },[])
    return(
        <>
         <div className="grid md:grid-cols-4 gap-6 ">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="relative  bg-gray-900 rounded p-2">
              <MovieCard movie={movie} />
              
            </div>
          ))}
        </div>
        </>
    )
}