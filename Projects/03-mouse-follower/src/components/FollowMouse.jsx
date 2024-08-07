import { useEffect, useState } from 'react'

export function FollowMouse() {
    const [enabled, setEnabled] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 }) //usar null si no tengo el dato, si no inicializar con el tipo de dato que vamos a usar

    //pointer move
    useEffect(() => {
        console.log('efecto', { enabled })

        const handleMove = (event) => {
            const { clientX, clientY } = event
            //console.log('handleMove', { clientX, clientY })
            setPosition({ x: clientX, y: clientY })
        }

        if (enabled) {
            window.addEventListener('pointermove', handleMove)
            // para verificar la cantidad de suscripciones que tiene el evento, en la consola del navegador ejecutar --> getEventListeners(window)
        }

        //cleanUp --> para limpiar suscripciones (los eventListener)
        return () => { // esto se ejecuta unicamente cuando deja de renderizar (se desmonta el componente) o cada vez que cambie la dependencia
            console.log('cleanUp')
            window.removeEventListener('pointermove', handleMove)
        }
    }, [enabled])

    //las dependencias del useEffect
    // [] -> solo se ejecuta una vez cuando se monta el componente
    // [enable] -> se ejecuta cada vez que cambia enable (variable linea 4) y cuando se monta el componente 
    // undefined -> cada vez que se renderiza el componente

    //change body className
    useEffect(() => {
        document.body.classList.toggle('no-cursor', enabled)
        //cleanUp --> para limpiar suscripciones (los eventListener)
        return () => { // esto se ejecuta cuando deja de renderizar (se desmonta el componente) o cada vez que cambie la dependencia
            document.body.classList.remove('no-cursor')
            setPosition({ x: 0, y: 0 })
            //no usar los setStates en los efectos cuando no se tienen dependencias, puede provocar loop infinito si no se controla la dependencia (incluso asi puede fallar)
        }
    }, [enabled])

    return (
        <main>
            <div style={{
                position: 'absolute',
                backgroundColor: '#09f',
                border: '2px solid #fff',
                borderRadius: '50%',
                opacity: 0.8,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.x}px, ${position.y}px)`
            }} />
            <button onClick={() => setEnabled(!enabled)}>
                {enabled ? 'No Seguir' : 'Seguir'} Puntero
            </button>
        </main>
    )
}