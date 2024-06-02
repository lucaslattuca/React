//import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App () {
    const formatUserName = (userName) => `@${userName}` //una funcion que se pasa como parametro
    const followText = <span>Seguir</span> //esto es un elemento que se pasa como parametro

    //se pueden pasar todas las props juntas como un objeto (no es lo ideal, no es una buena práctica)
    //const midudev = {formatUserName: formatUserName, userName: 'midudev', followText: followText}
    

    //usamos el estado para cambiar el nombre de uno de los objetos con un boton
    //const [name, setName] = useState('lucaslattuca')
    // const changeName = () => {
    //     //al cambiar el estado de un componente, renderiza a todos,los
    //     // hijos aunque estos no cambien
    //     setName('pedro')
    // }

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Angel Duran',
            isFollowing: false
        },
        {
            userName: 'VALORANT',
            name: 'Valorant',
            isFollowing: true
        },
        {
            userName: 'lucaslattuca',
            name: 'Lucas Lattuca',
            isFollowing: false
        }        
    ]


    //un componente es una factoria de elementos (crea elementos)
    // un elemento es lo que renderiza react
    return (
        // se pueden encerrar los componenten es etiquetas vacias
        // <>
            // lista de componentes
        //</>
        <section className='App'>

            {
                users.map(({ userName, name, isFollowing }) => 
                    (
                        <TwitterFollowCard 
                            key={userName}
                            formatUserName={formatUserName}
                            userName={userName} 
                            name="Lucas Lattuca"
                            followText = {followText}
                            initialIsFollowing = {isFollowing}
                        >
                            <strong>{name}</strong> {/* objeto que se pasa como children*/}
                        </TwitterFollowCard>
                    )
                )
            }

            {/* <TwitterFollowCard  {...midudev} > --> de esta forma se le pasan todos los parametros a traves de un objeto declarado anteriormente pero es mala practica
                <strong>Miguel Angel Duran</strong>
            </TwitterFollowCard> */}

            {/* <TwitterFollowCard 
                formatUserName={formatUserName}
                // userName="midudev" --> si no le paso el valor utiliza el valor del parametro por defecto
                followText = {followText}
            >
                <strong>Miguel Angel Duran</strong>
            </TwitterFollowCard>            */}

            {/* <button onClick={changeName}>Cambio Nombre</button> */}
        </section>
    )
}