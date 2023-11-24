import './App.css'
import { useEffect, useRef, useState } from 'react'  // permite crear una referencia mutable que persiste en todo el ciclo de vida del componente
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'


function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacía')
      return
    }
    if (search.match(/^\d+$/) /*si el input es un decimal*/) {
      setError('No se puede buscar con un número')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return {search, updateSearch, error}

}

function App() {
  const { movies } = useMovies()
  //const inputRef = useRef() //--> para obtener las referencias del objeto, en este caso del boton buscar (hay que evitar su abuso)

  const {search, updateSearch, error} = useSearch()
  

  const handleSubmit = (event) => {
    event.preventDefault()

    //usando js puro de forma nativa
    //esto es mejor porque captura todos los campos, de la otra forma hay que usar un useRef por cada input
    const fields = new window.FormData(event.target) /*Object.fromEntries(new window.FormData(event.target))*/ 
    const inputSearch = fields.get('inputSearch')
    console.log(inputSearch)

    //usando el useRef de React --> evitar cuando hay varios objetos a los cuales referenciar ya que se tiene que crear uno para cada objeto
    //const value = inputRef.current.value
    //console.log(value)

    //usando el useState
    //console.log(search)
  }

  //otra opcion de uso de manera controlada por react, mas lento ya que se renderiza cada vez que cambia (menos recomendada)
  //mayor facilidad para validar formularios
  const handleChange = (event) => {
    const newInputState = event.target.value
    if (newInputState.startsWith(' ')) return  //prevalidacion

    updateSearch(newInputState)
  }

  

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input  
            style={{
              border: '1px solid transparent', 
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange} value={search} name='inputSearch' 
            //ref={inputRef}
            placeholder='Avengers, Matrix, Star Wars...' 
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={ movies }/>
      </main>
    </div>
  )
}

export default App
