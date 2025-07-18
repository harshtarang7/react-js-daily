import { useState } from "react";

const intialBoard = () => Array(9).fill(null);

const useTicTacToe = () => {
  const [board, setBoard] = useState(intialBoard());
  const [isNext, setIsNext] = useState<boolean>(true);

    const WINNING_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  
    ];

    const calculateWinner = (currentBoard:any)=>{
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a,b,c] = WINNING_PATTERNS[i]
            if(currentBoard[a] &&currentBoard[a]===currentBoard[b] && currentBoard[a] === currentBoard[c]){
                return currentBoard[a]
            }
        }
        return null
    }

    const handleClick = (index:number)=>{
        // check the winner
        const winner = calculateWinner(board)
        if(winner || board[index]) return 

        const newBoard = [...board]
        newBoard[index] = isNext? "X":"O"
        setBoard(newBoard)
        setIsNext(!isNext);
    }

    const getStatusMessage = ()=>{
        const winner = calculateWinner(board)
        if(winner) return `Player ${winner} wins`;
        if(!board.includes(null)) return `It is a draw`;
        return `Player ${isNext ? "X" : "O"} turn `
    }

    const resetGame = ()=>{
        setBoard(intialBoard());
        setIsNext(true)
    }


    return {
        board,
        calculateWinner,
        handleClick,
        getStatusMessage,
        resetGame
    }
}

export default useTicTacToe;
