import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    //para recperar la cita al cargar la página
    useEffect(() => {
        //no puedes usar react Query, axios, apollo, SWR (por lo gral en las entrevistas te lo prohiben)
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                console.log(fact)
                setFact(fact)
            })
    }, [])

    //para recuperar la imagen cada vez que tenemos una cita nueva
    useEffect(() => {
        if (!fact) return
        // const firstWord = fact.split(' ')[0] //la pimer palabra
        const threeFirstWords = fact.split(' ', 3).join(' ') //las primeras 3 palabras
        console.log(threeFirstWords)
        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                console.log(response)
                console.log(url)
                setImageUrl(url)
            })
    }, [fact])

    return (
        <main>
            <h1>App de gatitos</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl &&
                    <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
                        alt={`Image extracted using the first trhee 
                        words for ${fact}`} />}
            </section>
        </main>
    )
}