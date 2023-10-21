import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { resetGameStorage, saveGameToStorage } from './logic/storage'


function App() {
  //Hook: useState
  const [board, setBoard] = useState(() => {
    //inicializar el estado del board
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar estado
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  //hook: useEffect -> se ejecuta cada vez que se renderiza el componente
  useEffect(() => {
    console.log("useEffect");
  }, [winner]) // si le colocamos el 2do parámetro, que es un array (lista de dependencias), 
  /* como vacío solo se ejecuta la 1ra vez que se renderiza el componente*/
  /*
    si le colocamos algo a la lista, se ejecuta cada vez que cambia algo relacionado a la dependencia
    en este caso cada vez que tenemos un winner, se ejecuta
  */

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar Juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
