import { useState } from 'react'
import './App.css'


const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${ isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const arrayEmpty = Array(9).fill(null)
  const [board, setBoard] = useState(arrayEmpty)
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCkeck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(boardToCkeck[a] &&
        boardToCkeck[a] === boardToCkeck[b] &&
        boardToCkeck[a] === boardToCkeck[c]
      ) {
        return boardToCkeck[a]
      }
    }
    
    return null
  }

  const resetGame = () => {
    setBoard(arrayEmpty)
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    //revisamos si no hay espacios vacios, esto es empate
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard= [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

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

      {winner !== null && (
        <section className='winner'>
          <div className='text'>
            <h2>
              {
                winner === false ? 'Empate' : 'Ganó '
              }
            </h2>
            <header className='win'>
              {winner && 
                <Square>{winner}</Square>
              }
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
