import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_KEY = "a189e8cf6bbef5b777e34a66fc3cd75b"

interface FetchMoviesParams {
  page: number
  searchQuery: string
}

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page, searchQuery }: FetchMoviesParams) => {
    try {
      const url = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`

      const response = await axios.get(url)

      return response.data.results
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)