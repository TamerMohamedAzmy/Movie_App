// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import axios from "axios"
// import type{ Movie } from "../Component/types/movi"
// import MovieCard from "../Component/moviecard"
// import MovieTrailer from "../Component/MovieTr"

// export default function MovieDetails() {
//   const { id } = useParams<{ id: string }>()
//   const [movie, setMovie] = useState<Movie | null>(null)
//   const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
//   const navigate = useNavigate()

//   const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

//   // جلب تفاصيل الفيلم
//   const fetchMovieDetails = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
//       )
//       setMovie(data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // جلب أفلام مشابهة
//   const fetchSimilarMovies = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
//       )
//       setSimilarMovies(data.results)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchMovieDetails()
//     fetchSimilarMovies()
//   }, [id])

//   if (!movie) return <div className="text-white p-10">Loading...</div>

//   return (
//     <div className="bg-black min-h-screen p-10">
//       {/* Movie Details */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="rounded-lg md:w-1/3"
//         />
//         <div className="text-white md:w-2/3">
//           <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//           <p className="mb-4">{movie.overview}</p>
//           <p className="mb-2">Release Date: {movie.release_date}</p>
//           <p className="mb-2">Rating: {movie.vote_average}</p>
//           <MovieTrailer movieId={movie.id}/>
//         </div>
//       </div>

//       {/* Similar Movies */}
//       <div className="mt-10">
//         <h2 className="text-2xl text-white font-bold mb-4">Similar Movies</h2>
//         {similarMovies.length === 0 ? (
//           <p className="text-gray-400">No similar movies found.</p>
//         ) : (
//           <div className="grid md:grid-cols-4 gap-6">
//             {similarMovies.map((m) => (
//               <MovieCard key={m.id} movie={m} />
              
//             ))}
            
//           </div>
//         )}
        
//       </div>

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//       >
//         Back
//       </button>
//     </div>
//   )
// }
import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../Component/Redux/store"
import { fetchMovieDetails, fetchSimilarMovies } from "../Component/Redux/movieDetailsReducer"
import MovieCard from "../Component/moviecard"
import MovieTrailer from "../Component/MovieTr"

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { movie, similarMovies, status } = useSelector((state: RootState) => state.movieDetails)

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id))
      dispatch(fetchSimilarMovies(id))
    }
  }, [dispatch, id])

  if (status === "loading" || !movie) {
    return <div className="text-white p-10">Loading...</div>
  }

  if (status === "failed") {
    return <div className="text-red-500 p-10">Error loading movie details.</div>
  }

  return (
    <div className="bg-black min-h-screen p-10">

      {/* Movie Details */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg md:w-1/3"
        />
        <div className="text-white md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-4">{movie.overview}</p>
          <p className="mb-2">Release Date: {movie.release_date}</p>
          <p className="mb-2">Rating: {movie.vote_average}</p>
          <MovieTrailer movieId={movie.id} />
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-10">
        <h2 className="text-2xl text-white font-bold mb-4">Similar Movies</h2>
        {similarMovies.length === 0 ? (
          <p className="text-gray-400">No similar movies found.</p>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {similarMovies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Back
      </button>
    </div>
  )
}