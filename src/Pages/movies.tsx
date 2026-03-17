import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { Movie } from "../Component/types/movi"
import MovieCard from "../Component/moviecard"
import HomeBanner from "../Component/HomeBanner"
import { fetchMovies } from "../Component/Redux/fetch"
import type { RootState, AppDispatch } from "../Component/Redux/store"

export default function Movies() {

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { movie: movies, status } = useSelector((state: RootState) => state.movies)

  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchMovies({ page, searchQuery }))
  }, [dispatch, page, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (search.trim() !== "") {
      navigate(`/?search=${search}`)
    } else {
      navigate("/")
    }
  }

  return (
    <>
      <HomeBanner />

      <div className="bg-black min-h-screen p-4 sm:p-6 md:p-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-white mb-8">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
          </h1>

          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Search movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l outline-none"
            />

            <button
              type="submit"
              className="bg-red-600 px-3 py-2 rounded-r hover:bg-red-700"
            >
              Search
            </button>
          </form>

        </div>

        {status === "loading" && (
          <p className="text-white text-center">Loading...</p>
        )}

        {status === "failed" && (
          <p className="text-red-500 text-center">Error loading movies</p>
        )}

        <div className="grid md:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <div key={movie.id} className="relative bg-gray-900 rounded p-2">
              <MovieCard movie={movie} />
            
            </div>
          ))}
        </div>

        {/* Pagination */}

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Prev
          </button>

          <span className="text-white text-lg">Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>

      </div>
    </>
  )
}