// import type{ Movie } from "./types/movi"
// import { Link } from "react-router-dom"
// interface Props{
// movie:Movie
// }
//    export default function MovieCard({movie}:Props){ 
//      return(
     
//      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 duration-300"> 
//      <Link to={`/movie/${movie.id}`}>
//      <img
//      className="w-full rounded"
//      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//      alt={movie.title}
//      />   

//      <div className="p-4">
//        <h3 className="text-white text-lg font-semibold">
//        {movie.title}
//        </h3>
       
//        <p className="text-gray-400 text-sm mt-2 line-clamp-3">
//        {movie.overview}
//        </p>
//        </div>
//        </Link>   
//        </div>
//        )}


import type { Movie } from "./types/movi"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorites, addToTopRated } from "../Component/Redux/movieSlice"
import type { RootState } from "../Component/Redux/store"

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {

  const dispatch = useDispatch()

  const { favorites, topRated } = useSelector((state: RootState) => state.movies)

  const isFav = favorites.includes(movie.id)
  const isTop = topRated.includes(movie.id)

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 duration-300 relative">

      {/* Buttons */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">

        <button
          onClick={(e) => {
            e.preventDefault()
            dispatch(addToFavorites(movie.id))
          }}
          className={` cursor-pointer px-2 py-1 rounded text-xs ${
            isFav ? "bg-red-600 text-white" : "bg-gray-700 text-white"
          }`}
        >
          ❤️
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            dispatch(addToTopRated(movie.id))
          }}
          className={`cursor-pointer px-2 py-1 rounded text-xs ${
            isTop ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"
          }`}
        >
          ⭐
        </button>

      </div>

      <Link to={`/movie/${movie.id}`}>

        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="p-4">

          <h3 className="text-white text-lg font-semibold">
            {movie.title}
          </h3>

          <p className="text-gray-400 text-sm mt-2 line-clamp-3">
            {movie.overview}
          </p>

        </div>

      </Link>

    </div>
  )
}