// import { createAsyncThunk } from "@reduxjs/toolkit"
// import axios from "axios"

// const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

// export const fetchMovieDetails = createAsyncThunk(
//   "movieDetails/fetchMovieDetails",
//   async (id: string) => {
//     const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
//     return res.data
//   }
// )

// export const fetchSimilarMovies = createAsyncThunk(
//   "movieDetails/fetchSimilarMovies",
//   async (id: string) => {
//     const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
//     return res.data.results
//   }
// )