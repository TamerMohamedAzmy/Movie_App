import { configureStore } from "@reduxjs/toolkit"
import movieDetailsSlice from "./movieDetailsReducer" // Slice اللي فيها fetchMovieDetails + fetchSimilarMovies
import moviesReducer from "./movieSlice" // Popular / Favorites / TopRated

export const store = configureStore({
  reducer: {
    movieDetails: movieDetailsSlice, // تفاصيل الفيلم + similar
    movies: moviesReducer,             // أفلام عامة / favorites / topRated
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch