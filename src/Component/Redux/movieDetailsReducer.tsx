import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (id: string) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
    return res.data
  }
)

export const fetchSimilarMovies = createAsyncThunk(
  "movieDetails/fetchSimilarMovies",
  async (id: string) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    )
    return res.data.results
  }
)

interface MovieDetailsState {
  movie: any | null
  similarMovies: any[]
  status: "idle" | "loading" | "success" | "failed"
}

const initialState: MovieDetailsState = {
  movie: null,
  similarMovies: [],
  status: "idle",
}

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Movie Details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading"
        state.movie = null
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "success"
        state.movie = action.payload
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.status = "failed"
        state.movie = null
      })

      // Similar Movies
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.similarMovies = []
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.similarMovies = action.payload
      })
      .addCase(fetchSimilarMovies.rejected, (state) => {
        state.similarMovies = []
      })
  },
})

export default movieDetailsSlice.reducer