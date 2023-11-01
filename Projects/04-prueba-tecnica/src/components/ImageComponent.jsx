import { useCatImage } from "../hooks/useCatImage";


export function ImageComponent({ fact }) {
    const { imageUrl } = useCatImage({ fact })

    return (
        <>
            {imageUrl &&
                <img src={imageUrl}
                    alt={`Image extracted using the first trhee words for ${fact}`} />
            }
        </>
    )
}