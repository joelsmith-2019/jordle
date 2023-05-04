import './Cell.scss';
import React, { useContext, useEffect } from 'react';
import { GameContext } from '../gameboard/GameBoard';

const Cell = ({ rowIndex, cellIndex }) => {

    // Get game context
    let context = useContext(GameContext);

    // Determine if this cell is in the active row
    let isActiveRow = rowIndex === context.guesses.length;

    // Get the word associated with this row
    let word = isActiveRow ? context.currentWord : context.guesses[rowIndex] || "";

    // Get the letter associated with this cell
    let letter = word[cellIndex] || "";

    // Determine if this cell is the target cell (cell to be filled next)
    let isTarget = isActiveRow && cellIndex === context.currentWord.length;

    // Create a unique ID for this cell
    const cellId = `game-cell-${rowIndex}-${cellIndex}`;

    // Get the cell
    const cell = document.getElementById(cellId);

    // Apply styles when cell is filled with a letter
    useEffect(() => {
        if (cell) {
            // Update cell status
            if (isActiveRow && cell.innerText) {
                cell.classList.add('filled-cell');
            } else {
                cell.classList.remove('filled-cell');
            }
        }

    }, [cell, isActiveRow, context.currentWord])

    // Update the cell's class when the target cell changes
    useEffect(() => {
        // Check if this cell is the target cell
        let isTargetCell = isTarget && context.status === "IN_PROGRESS";

        // Handle non-null cells
        if (cell) {
            // Update target status
            if (isTargetCell) {
                document.getElementById(cellId).classList.add('target-cell')
            } else {
                document.getElementById(cellId).classList.remove('target-cell');
            }
        } else if (isTargetCell) {
            // Add target class after a delay if the cell is null (actively being created)
            setTimeout(() => {
                let el = document.getElementById(cellId);
                if (el) el.classList.add('target-cell');
            }, 1000);
        }
    }, [cell, cellId, isTarget, context.status, context.guesses, context.currentWord])

    // Return JSX for Cell
    return (
        <div id={cellId} className="game-cell">
            {letter.toUpperCase()}
        </div>
    );
};

// Export Cell
export default Cell;