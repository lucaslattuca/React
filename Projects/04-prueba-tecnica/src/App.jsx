import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import { ImageComponent } from './components/ImageComponent'

export function App() {

    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact }) //para recuperar la imagen cada vez que tenemos una cita nueva

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new Fact</button>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <ImageComponent fact={fact} />}
            </section>
        </main>
    )
}