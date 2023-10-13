import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCkeck) => {
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

export const  checkEndGame = (newBoard) => {
    //revisamos si no hay espacios vacios, esto es empate
    return newBoard.every((square) => square !== null)
}