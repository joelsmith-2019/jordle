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

    // The results of the game
    const [results, setResults] = useState(null);

    // The solution to the game.
    const [solution, setSolution] = useState(props.solution.toUpperCase());

    // The number of attempts the user has to guess the solution.
    const [attempts, setAttempts] = useState(Math.max(1, props.attempts));

    // The words the user has guessed
    const [guesses, setGuesses] = useState([]);

    // The current word the user is guessing
    const [currentWord, setCurrentWord] = useState("");

    // The colors of the letters
    const [letterClasses, setLetterClasses] = useState(new Map());
    function setLetterClass(letter, clss) {
        setLetterClasses(new Map(letterClasses.set(letter.toLowerCase(), clss)));
    }

    // The error text to display
    const [error, setError] = useState();

    // State to handle the key function for the event listener
    const [keyFunc, setKeyFunc] = useState(() => function (event) { return null; });

    // Check if the user has won or lost
    useEffect(() => {
        // Check if the user has won
        if (guesses.length > 0 && guesses[guesses.length - 1].toUpperCase() === solution.toUpperCase()) {
            setStatus("WON");
            setTimeout(() => {
                setResults({ status: "WON", solution: solution, guesses: guesses.length });
            }, solution.length * 350 + 1000);
        } else if (guesses.length === attempts) {
            setStatus("LOST");
            setTimeout(() => {
                setResults({ status: "LOST", solution: solution, guesses: guesses.length });
            }, solution.length * 350 + 1000);
        }
    }, [solution, attempts, guesses]);

    // Update the key function
    useEffect(() => {

        setKeyFunc(() => function (event) {

            // Skip if event is invalid
            if (!event || !event.key) return;

            // Ensure the game is in progress
            if (status !== "IN_PROGRESS") {
                return;
            }

            // Switch statement for: Enter, Backspace, Letter
            switch (event.key) {
                case "Enter":
                    // console.log("Keyboard Pressed: Enter");

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
                    // console.log("Keyboard Pressed: Backspace");
                    setCurrentWord(currentWord.slice(0, -1));
                    setError(null);
                    break;
                default:
                    // Check if letter is in the alphabet
                    if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {

                        // Check if the word is too long
                        if (currentWord.length < solution.length) {
                            // console.log("Keyboard Pressed: " + event.key.toUpperCase());
                            setCurrentWord(currentWord + event.key.toUpperCase());
                        }
                        setError(null);
                    }
                    break;
            }
        });
    }, [status, solution, guesses, currentWord, error])

    // Add event listener for key presses
    useEffect(() => {
        // console.log("Adding event listener for key presses");
        document.addEventListener("keydown", keyFunc);

        // Remove event listener for key presses
        return () => {
            // console.log("Removing event listener for key presses");
            document.removeEventListener("keydown", keyFunc);
        }
    }, [keyFunc]);

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
        <GameContext.Provider value={{
            status,
            solution,
            attempts,
            guesses,
            currentWord,
            letterClasses,
            setLetterClass,
            error,
            keyFunc
        }}>
            <div id={props.id} className="game-board">

                <div className="game-board-top">
                    {/* Board header */}
                    <div className="game-stats text-center">
                        {/* <h2>Game Board</h2>
                        <p>Status: {status}</p>
                        <p>Solution: {solution}</p>
                        <p>Word Length: {solution.length}</p>
                        <p>Attempts: {attempts}</p> */}
                    </div>

                    {/* Get rows */}
                    <div className="game-grid">
                        {getRows()}
                    </div>

                    {/* Display error message */}
                    <div className="game-error">
                        <span>{error && error.message}</span>
                    </div>

                    {/* Button for resetting game */}
                    {results &&
                        <div className="text-center">

                            {/* Win message */}
                            {results.status === "WON" &&
                                <div>
                                    <p>You won with {results.guesses} guess{results.guesses > 1 && <span>es</span>}! <br/>
                                        {results.guesses === 1 &&
                                            <span>Wow, you might just be a genius...</span>
                                        }
                                        {results.guesses === 2 &&
                                            <span>That was impresive!</span>
                                        }
                                        {results.guesses === 3 &&
                                            <span>That was quite splendid!</span>
                                        }
                                        {(results.guesses === 4 || results.guesses === 5) &&
                                            <span>Nice work!</span>
                                        }
                                        {(results.guesses > 4 && results.guesses === attempts) &&
                                            <span>That was close!</span>
                                        }
                                    </p>
                                </div>
                            }

                            {/* Lose message */}
                            {results.status === "LOST" &&
                                <div>
                                    <p>
                                        You lost!<br />
                                        The word was: <strong>{results.solution}</strong>
                                    </p>
                                </div>
                            }

                            {/* Play again button */}
                            <button className="jordle-button" onClick={props.resetGame}>Play Again</button>
                        </div>
                    }
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