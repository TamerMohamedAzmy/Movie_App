import { useEffect, useState } from "react"
import type { Movie } from "../Component/types/movi"
import MovieCard from "../Component/moviecard"
import axios from "axios"

export default function TopRatedPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<number[]>([])

  const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

  useEffect(() => {
    const top = JSON.parse(localStorage.getItem("topRated") || "[]")
    setTopRated(top)

    const fetchMovies = async () => {
      const requests = top.map((id: number) =>
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      ) 
      // wait all 
      const results = await Promise.all(requests)
      setMovies(results.map((res) => res.data))
    }

    if (top.length > 0) fetchMovies()
  }, [])

  if (topRated.length === 0)
    return <p className="text-white p-10">No top rated movies yet.</p>

  return (
    <div className="bg-black min-h-screen p-10">
      <h2 className="text-3xl text-white font-bold mb-6">Your Top Rated</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}