import Cell from "../cell/Cell";
import React, { useContext, useEffect } from "react";
import { GameContext } from "../gameboard/GameBoard";
import "./Row.scss";

const Row = ({ rowIndex }) => {

    // Get game context
    const context = useContext(GameContext);

    // Create a unique ID for this row
    const rowId = `game-row-${rowIndex}`;

    // Get the row element
    let row = document.getElementById(rowId);

    // Check if not word error
    useEffect(() => {
        if (row) {

            if (!context.error) {

                // Remove styles from row
                row.classList.remove('invalid-row');

            } else if (rowIndex === context.guesses.length && context.error.type === "INVALID_WORD") {

                // Add styles to row
                row.classList.add('invalid-row');
            }
        }
    }, [row, rowIndex, context.error, context.guesses.length]);

    // Update row styles when 'Enter' is pressed
    useEffect(() => {

        // Check if this row is active (last guess row)
        let isActive = rowIndex === context.guesses.length - 1;
        if (!isActive) return;

        // Get the row element
        if (row) {

            // Apply sytles to inner cells
            for (let i = 0; i < row.children.length; i++) {

                // Get the cell and letter
                let cell = row.children[i];
                let letter = cell.innerText;

                // Check if letter is in solution
                let isCorrect = context.solution[i] === letter;
                let isContained = context.solution.includes(letter);

                // Add animation class
                setTimeout(() => {
                    console.log(`Revealing cell ${i}`);
                    cell.classList.add('reveal-cell');

                    // Apply correctness styles
                    setTimeout(() => {
                        if (isCorrect) {
                            cell.classList.add('correct-letter');
                        } else if (isContained) {
                            cell.classList.add('contains-letter');
                        } else {
                            cell.classList.add('invalid-letter');
                        }
                    }, 300);
                }, i * 350);
            }
        }
    }, [row, rowIndex, context.solution, context.guesses.length]);

    // Get cells associated with the row
    function getCells() {
        let cells = [];
        for (let i = 0; i < context.solution.length; i++) {
            cells.push(<Cell key={i} rowIndex={rowIndex} cellIndex={i} />);
        }
        return cells;
    }

    // Return JSX for Row
    return (
        <div id={rowId} className="game-row">
            {getCells()}
        </div>
    );
}

// Export Row
export default Row;