import { useEffect, useState } from "react"

//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (!fact) return
        // const firstWord = fact.split(' ')[0] //la pimer palabra
        const threeFirstWords = fact.split(' ', 3).join(' ') //las primeras 3 palabras

        const url = `/cat/says/${threeFirstWords}?size=50&color=red`
        setImageUrl(url)
        // fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
        //     .then(res => res.json())
        //     .then(response => {
        //         const { url } = response //--> no existe la prop url en el response (cambió la api)
        //         console.log(url)
        //         setImageUrl(url)
        //     })
    }, [fact])

    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}