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

            // Array storing solution classes: correct-letter, contains-letter, invalid-letter
            let solutionClasses = new Array(context.solution.length).fill("invalid-letter");

            // Create map of solution letters
            let solutionLetterMap = new Map();

            // First loop for: filling solution map, identifying correct and incorrect letters
            for (let i = 0; i < context.solution.length; i++) {

                // Get the letter
                let letter = row.children[i].innerText;

                // Fill solution map
                let solutionLetter = context.solution[i];
                if (solutionLetterMap.has(solutionLetter)) {
                    solutionLetterMap.set(solutionLetter, solutionLetterMap.get(solutionLetter) + 1);
                } else {
                    solutionLetterMap.set(solutionLetter, 1);
                }

                // Check if letter is in solution
                let isCorrect = context.solution[i] === letter;

                // Apply correctness styles
                if (isCorrect) {
                    solutionClasses[i] = 'correct-letter';

                    // Decrement solution map
                    if (solutionLetterMap.has(letter)) {
                        solutionLetterMap.set(letter, solutionLetterMap.get(letter) - 1);
                    } else {
                        solutionLetterMap.set(letter, -1);
                    }
                }
            }

            console.log(solutionLetterMap);

            // Second loop for: identifying contains letter, playing animation
            for (let i = 0; i < context.solution.length; i++) {

                // Get the cell & letter
                let cell = row.children[i];
                let letter = cell.innerText;

                // Check if letter is in solution
                let isCorrect = context.solution[i] === letter;
                let isContained = context.solution.includes(letter);

                // Apply correctness styles
                if (!isCorrect && isContained && solutionLetterMap.get(letter) > 0) {
                    // Set solution class
                    solutionClasses[i] = 'contains-letter';

                    // Decrement solution map
                    solutionLetterMap.set(letter, solutionLetterMap.get(letter) - 1);
                }

                // Play revealing animation
                setTimeout(() => {
                    // console.log(`Revealing cell ${i}`);
                    cell.classList.add('reveal-cell');

                    // Apply correctness styles
                    setTimeout(() => {
                        cell.classList.add(solutionClasses[i]);

                        // Force apply 'correct-letter', only apply 'contains-letter' or 'invalid-letter' if not already set
                        if (solutionClasses[i] === 'correct-letter' || !context.letterClasses.has(letter.toLowerCase())) {
                            let classes = 'reveal-key ' + solutionClasses[i];
                            context.setLetterClass(letter, classes);

                            // Remove 'reveal-key' class after a delay
                            setTimeout(() => {
                                context.setLetterClass(letter, solutionClasses[i]);
                            }, 650);
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