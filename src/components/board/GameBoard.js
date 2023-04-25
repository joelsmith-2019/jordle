import React, { useEffect, useState } from "react";
import Row from "../row/Row";
import DictionaryService from "../../services/DictionaryService";

// Create the context
export const GameContext = React.createContext(null);

const GameBoard = (props) => {

    // The status of the board (IN_PROGRESS, WON, LOST)
    const [status, setStatus] = useState(props.status);

    // The solution to the game.
    const [solution, setSolution] = useState(props.solution);

    // The number of attempts the user has to guess the solution.
    const [attempts, setAttempts] = useState(Math.max(1, props.attempts));

    // The words the user has guessed
    const [guesses, setGuesses] = useState([]);

    // The current word the user is guessing
    const [currentWord, setCurrentWord] = useState("");

    // Check if the user has won or lost
    useEffect(() => {

        // Check if the user has won
        if (guesses.length > 0 && guesses[guesses.length - 1].toUpperCase() === solution.toUpperCase()) {
            setStatus("WON");
        } else if (guesses.length === attempts) {
            setStatus("LOST");
        }

    }, [solution, attempts, guesses])

    // Add event listener for key presses
    useEffect(() => {

        // Function to handle key presses
        const onKeyPress = (event) => {

            // Ensure the game is in progress
            if (status !== "IN_PROGRESS") {
                return;
            }

            // Switch statement for: Enter, Backspace, Letter
            switch (event.key) {
                case "Enter":
                    console.log("Keyboard Pressed: Enter");

                    // Check if the word is valid
                    if (DictionaryService.isValidWord(currentWord)) {
                        setGuesses([...guesses, currentWord]);
                        setCurrentWord("");
                    } else {
                        console.log("Invalid word!");
                    }
                    break;
                case "Backspace":
                    console.log("Keyboard Pressed: Backspace");
                    setCurrentWord(currentWord.slice(0, -1));
                    break;
                default:
                    // Check if letter is in the alphabet
                    if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {

                        // Check if the word is too long
                        if (currentWord.length < solution.length) {   
                            console.log("Keyboard Pressed: " + event.key);
                            setCurrentWord(currentWord + event.key);
                        }
                    }
                    break;
            }
        }

        // Add event listener for key presses
        // console.log("Adding event listener for key presses");
        document.addEventListener("keydown", onKeyPress);

        // Remove event listener for key presses
        return () => {
            // console.log("Removing event listener for key presses");
            document.removeEventListener("keydown", onKeyPress);
        }
    }, [status, solution, guesses, currentWord]);

    // Create rows
    function getRows() {
        let rows = [];

        for (let i = 0; i < attempts; i++) {
            rows.push(<Row key={i} rowIndex={i} />);
        }

        return rows;
    };

    // Return the board as JSX
    return (
        <GameContext.Provider value={{ status, solution, attempts, guesses, currentWord }}>

            {/* Board header */}
            <div className="text-center">
                <h2>Game Board</h2>
                <p>Status: {status}</p>
                <p>Solution: {solution}</p>
                <p>Word Length: {solution.length}</p>
                <p>Attempts: {attempts}</p>
            </div>

            {/* Grid */}
            <div>
                {getRows()}
            </div>
        </GameContext.Provider>
    );
}

// Export the game board
export default GameBoard;