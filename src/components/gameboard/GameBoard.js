import React, { useEffect, useState } from "react";
import Row from "../row/Row";
import Keyboard from "../keyboard/Keyboard";
import DictionaryService from "../../services/DictionaryService";
import "./GameBoard.scss";

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

    // The error text to display
    const [error, setError] = useState();

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

                    // Prevent enter from executing if there is an error
                    if (error) return;

                    // Prevent short words
                    if (currentWord.length !== solution.length) {
                        console.log("Too short!");
                        setError({ type: "SHORT_WORD", message: "The word is too short!" });
                    } else {

                        // Check if the word is valid
                        DictionaryService.isValidWord(currentWord).then(isValid => {
                            if (isValid) {
                                setGuesses([...guesses, currentWord]);
                                setCurrentWord("");
                            } else {
                                console.log("Invalid word!");
                                setError({ type: "INVALID_WORD", message: "That is not a word, silly goose!" });
                            }
                        });
                    }
                    break;
                case "Backspace":
                    console.log("Keyboard Pressed: Backspace");
                    setCurrentWord(currentWord.slice(0, -1));
                    setError(null);
                    break;
                default:
                    // Check if letter is in the alphabet
                    if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {

                        // Check if the word is too long
                        if (currentWord.length < solution.length) {
                            console.log("Keyboard Pressed: " + event.key);
                            setCurrentWord(currentWord + event.key);
                        }
                        setError(null);
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
    }, [status, solution, guesses, currentWord, error]);

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
        <GameContext.Provider value={{ status, solution, attempts, guesses, currentWord, error }}>
            <div className="game-board">

                <div className="game-board-top">
                    {/* Board header */}
                    <div className="game-stats text-center">
                        <h2>Game Board</h2>
                        <p>Status: {status}</p>
                        <p>Solution: {solution}</p>
                        <p>Word Length: {solution.length}</p>
                        <p>Attempts: {attempts}</p>
                    </div>

                    {/* Get rows */}
                    <div className="game-grid">
                        {getRows()}
                    </div>

                    {/* Display error message */}
                    <div className="game-error">
                        <span>{error && error.message}</span>
                    </div>
                </div>

                {/* Display keyboard */}
                <div className="game-board-bottom">
                    <Keyboard />
                </div>
            </div >
        </GameContext.Provider>
    );
}

// Export the game board
export default GameBoard;