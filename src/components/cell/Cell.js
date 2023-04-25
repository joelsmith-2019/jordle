import './Cell.scss';
import React, { useContext, useEffect } from 'react';
import { GameContext } from '../board/GameBoard';

const Cell = ({ rowIndex, cellIndex }) => {
    
    let context = useContext(GameContext);

    let isActive = rowIndex === context.guesses.length;

    let word = isActive ? context.currentWord : context.guesses[rowIndex] || "";
    
    let letter = word[cellIndex] || "";

    // useEffect(() => {
    //     console.log('Cell detected letter changes!');
    // }, [letter])

    return (
        <div className="cell">

            <div>
                {letter.toUpperCase()}
            </div>

        </div>
    );
};

export default Cell;