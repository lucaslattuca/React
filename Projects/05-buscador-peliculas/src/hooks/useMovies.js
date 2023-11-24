import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search}) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState(null)

    const getMovies = async () => {
      try {
        setLoading(true)
        SetError(null)
        const moviesResponse = await searchMovies({ search })
        setMovies(moviesResponse)
      } catch (e) {
        SetError(e.message)
      } finally {
        setLoading(false)
      }
    }
  
    return { movies, getMovies, loading, error }
  }