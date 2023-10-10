import { useState } from "react";

/* eslint-disable react/prop-types */
export function TwitterFollowCard ({ children, formatUserName, userName= 'unknown', followText }) {
    const [isFollowing, setIsFollowing] = useState(false)
    //estas 3 lineas se simplifican con la anterior
    //const state = useState(false)
    //const isFollowing = state[0]
    //const setIsFollowing = state[1]

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    followText = isFollowing ? 'Siguiendo' : 'Seguir'
    const btnClassName = isFollowing 
        ? 'tw-followCard-followBtn is-following'
        : 'tw-followCard-followBtn'
    //las props no se tienen que modificar, tienen que ser inmutables
    // --> esto esta mal --> const userName = `@${userName}`
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                    className='tw-followCard-avatar'
                    alt={`El avatar de ${userName}`} 
                    src={`https://unavatar.io/${userName}`}/>
                <div className='tw-followCard-info'>
                    {children}
                    <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className={btnClassName} onClick={handleClick}>
                    {followText}
                </button>
            </aside>
        </article>
    )
}