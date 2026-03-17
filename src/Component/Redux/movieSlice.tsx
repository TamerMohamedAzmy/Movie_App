import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchMovies } from "./fetch"

interface MovieState {
  movie: any[]
  favorites: number[]
  topRated: number[]
  status: "idle" | "loading" | "success" | "failed"
}

const initialState: MovieState = {
  movie: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  topRated: JSON.parse(localStorage.getItem("topRated") || "[]"),
  status: "idle",
}

const MovieReducer = createSlice({
  name: "movies",
  initialState,

  reducers: {

    addToFavorites: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload)
        localStorage.setItem("favorites", JSON.stringify(state.favorites))
      }
    },

    addToTopRated: (state, action: PayloadAction<number>) => {
      if (!state.topRated.includes(action.payload)) {
        state.topRated.push(action.payload)
        localStorage.setItem("topRated", JSON.stringify(state.topRated))
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
      localStorage.setItem("favorites", JSON.stringify(state.favorites))
    },
    removeFromTopRated: (state, action: PayloadAction<number>) => {
      state.topRated = state.topRated.filter(id => id !== action.payload)
      localStorage.setItem("topRated", JSON.stringify(state.topRated))
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading"
      })

      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.status = "success"
        state.movie = action.payload
      })

      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {
  addToFavorites,
  addToTopRated,
  removeFromFavorites,
  removeFromTopRated
} = MovieReducer.actions

export default MovieReducer.reducer