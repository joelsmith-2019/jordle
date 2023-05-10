import GameBoard from "../gameboard/GameBoard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordGeneratorService from "../../services/WordGeneratorService";
import WordGeneratorShortService from "../../services/WorldGeneratorShortService";
import "./ControlPanel.scss";
import DictionaryService from "../../services/DictionaryService";

const ControlPanel = (props) => {

    // Navigation hook
    let navigate = useNavigate();

    // The game board
    const [board, setBoard] = useState(null);

    // Form input
    const [input, setInput] = useState(
        {
            wordLength: 5,
            maxAttempts: 6
        }
    );

    // Loading state (Default to true if classic game)
    const [isLoading, setIsLoading] = useState(props.isClassic);

    // Set the board if classic game
    useEffect(() => {
        console.log(props.isClassic);
        console.log(input);

        if (props.isClassic) {
            startGame();
        }
    }, []);

    // Handle input change
    function onChange(event) {
        setInput(
            {
                ...input,
                [event.target.name]: event.target.value
            });
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        startGame();
    }

    // Reset the settings
    function resetSettings(event) {
        event.preventDefault();
        setInput(
            {
                wordLength: 5,
                maxAttempts: 6
            }
        );
    }

    // Start the game
    function startGame() {

        // Set board to loading
        setIsLoading(true);

        let len = input.wordLength;

        (len <= 9 ? WordGeneratorShortService : WordGeneratorService).generateWord(len)
            .then((word) => {

                DictionaryService.isValidWord(word)
                    .then(isValid => {

                        if (isValid) {

                            // Set the board
                            setBoard(
                                <GameBoard
                                    status="IN_PROGRESS"
                                    solution={word}
                                    attempts={input.maxAttempts}
                                    resetGame={resetGame}
                                />
                            );

                            // Set loading to false
                            setIsLoading(false);

                        } else {
                            // Try to start the game again
                            startGame();
                        }
                    })
                    .catch(err => {
                        // Error occured with dictionary, try to start again
                        startGame();
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Reset the game board
    function resetGame() {
        // Set board to null
        setBoard(null);

        // Start classic game again
        if (props.isClassic) startGame();
    }

    // Return control panel JSX
    return (
        <div className="control-panel">

            {/* Game Details */}
            {!board && !isLoading &&
                <div className="control-details">

                    {/* Start Game Form */}
                    {!board &&
                        <div className="row justify-content-center align-items-center">

                            <div className="col-12 col-md-6">

                                <form>

                                    {/* Settings info */}
                                    <div>

                                        {/* Font awesome go back icon */}
                                        <div>
                                            <button className="jordle-icon" onClick={() => navigate('/')}>
                                                <i className="fa fa-arrow-left fa-fw me-2"></i>
                                                <span>Go Back</span>
                                            </button>
                                        </div>

                                        <div className="border-top border-bottom pt-3">
                                            <h3>Game Settings</h3>
                                            <p>
                                                Modify the game settings below. The word length is the number of
                                                letters in the word you will be guessing. The max attempts is the
                                                number of incorrect guesses you can make before you lose the game.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Reset button */}
                                    <div className="text-end my-3">
                                        <button className="jordle-icon" onClick={resetSettings}>
                                            {/* Font awesome reset icon */}
                                            <i className="fas fa-undo-alt"></i>
                                        </button>
                                    </div>

                                    {/* Input of number slider (min 3, max 15) */}
                                    <div className="input-group my-3">
                                        <label className="form-label" htmlFor="word-length">Word Length ({input.wordLength})</label>
                                        <br />
                                        <input
                                            className="form-range"
                                            type="range"
                                            id="word-length"
                                            name="wordLength"
                                            min="3"
                                            max="15"
                                            onChange={onChange}
                                            value={input.wordLength}
                                        />
                                    </div>

                                    {/* Max attempts int slider (min 1, max 15) */}
                                    <div className="input-group my-3">
                                        <label className="form-label" htmlFor="max-attempts">Max Attempts ({input.maxAttempts})</label>
                                        <br />
                                        <input
                                            className="form-range"
                                            type="range"
                                            id="max-attempts"
                                            name="maxAttempts"
                                            min="1"
                                            max="15"
                                            onChange={onChange}
                                            value={input.maxAttempts}
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <div className="input-group my-3">
                                        <button className="jordle-button" onClick={handleSubmit}>Start Game</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            }

            {/* Loading spinner */}
            {isLoading &&
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            {/* Game Board */}
            {board}
        </div>
    );
};

// Export control panel
export default ControlPanel;