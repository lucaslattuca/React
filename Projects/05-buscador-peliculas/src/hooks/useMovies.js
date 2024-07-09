import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState(null)
    const previusSearch = useRef(search)

    const getMovies = async () => {
      if (search === previusSearch.current) return // con esto evitamos que haga la busqueda de algo que ya buscó
      try {
        setLoading(true)
        SetError(null)
        previusSearch.current = search
        const moviesResponse = await searchMovies({ search })
        setMovies(moviesResponse)
      } catch (e) {
        SetError(e.message)
      } finally {
        setLoading(false)
      }
    }

    const sortedMovies = sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
  
    return { movies: sortedMovies, getMovies, loading, error }
  }