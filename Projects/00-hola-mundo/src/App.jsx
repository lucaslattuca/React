import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App () {
    const formatUserName = (userName) => `@${userName}` //una funcion que se pasa como parametro
    const followText = <span>Seguir</span> //esto es un elemento que se pasa como parametro

    //se pueden pasar todas las props juntas como un objeto (no es lo ideal, no es una buena práctica)
    const midudev = {formatUserName: formatUserName, userName: 'midudev', followText: followText}
    const [name, setName] = useState('lucaslattuca')


    const changeName = () => {
        //al cambiar el estado de un componente, renderiza a todos,los
        // hijos aunque estos no cambien
        setName('pedro')
    }
    //un componente es una factoria de elementos (crea elementos)
    // un elemento es lo que renderiza react
    return (
        // se pueden encerrar los componenten es etiquetas vacias
        // <>
            // lista de componentes
        //</>
        <section className='App'>
            <TwitterFollowCard  {...midudev} >
                <strong>Miguel Angel Duran</strong>
            </TwitterFollowCard>

            <TwitterFollowCard 
                formatUserName={formatUserName}
                userName="lucaslattuca"
                followText = {followText}
            >
                <strong>Lucas Lattuca</strong>
            </TwitterFollowCard>

            <TwitterFollowCard 
                formatUserName={formatUserName}
                // userName="midudev" --> si no le paso el valor utiliza el valor del parametro por defecto
                followText = {followText}
            >
                <strong>Miguel Angel Duran</strong>
            </TwitterFollowCard>

            <TwitterFollowCard 
                formatUserName={formatUserName}
                userName={name} 
                name="Lucas Lattuca"
                followText = {followText}
            >
                <strong>Lucas Lattuca</strong>
            </TwitterFollowCard>

            <button onClick={changeName}>Cambio Nombre</button>
        </section>
    )
}