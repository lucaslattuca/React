import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { ImageComponent } from './components/ImageComponent'

export function App() {

    const { fact, refreshFact } = useCatFact()

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Get new Fact</button>
            <section>
                {fact && <p>{fact}</p>}
                <ImageComponent fact={fact} />
            </section>
        </main>
    )
}