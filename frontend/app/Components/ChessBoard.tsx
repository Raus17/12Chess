import { Square, PieceSymbol, Color } from 'chess.js';
import React from 'react'

const ChessBoard = ({board} : {
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}) => {
  return (
    <div>
        <div className='grid grid-cols-8 gap-4'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`w-16 h-16 flex items-center justify-center ${ (rowIndex + cellIndex) % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`}>
                            {cell && <img src={`/pieces/${cell.color}${cell.type}.png`} alt={`${cell.color} ${cell.type}`} className='w-12 h-12' />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChessBoard