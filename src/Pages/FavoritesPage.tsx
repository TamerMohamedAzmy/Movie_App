import { useEffect, useState } from "react"
import type { Movie } from "../Component/types/movi"
import MovieCard from "../Component/moviecard"
import axios from "axios"

export default function FavoritesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(fav)

    // Fetch details لكل فيلم
    const fetchMovies = async () => {
      const requests = fav.map((id: number) =>
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      )
      const results = await Promise.all(requests)
      setMovies(results.map((res) => res.data))
    }

    if (fav.length > 0) fetchMovies()
  }, [])

  if (favorites.length === 0)
    return <p className="text-white p-10">No favorite movies yet.</p>

  return (
    <div className="bg-black min-h-screen p-10">
      <h2 className="text-3xl text-white font-bold mb-6">Your Favorites</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}