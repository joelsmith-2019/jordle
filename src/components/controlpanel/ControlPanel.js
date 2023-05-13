import GameBoard from "../gameboard/GameBoard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordGeneratorService from "../../services/WordGeneratorService";
import ShortWordGeneratorService from "../../services/ShortWordGeneratorService";
import "./ControlPanel.scss";
import DictionaryService from "../../services/DictionaryService";
import DailyWordService from "../../services/DailyWordService";
import { Buffer } from "buffer";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

const ControlPanel = (props) => {

    // Navigation hook
    let navigate = useNavigate();

    // The game type
    const gameType = props.gameType;

    // The game board
    const [board, setBoard] = useState(null);

    // Optional settings for the byo shared game
    const { settings: byoSettings } = useParams();

    // Form input
    const [input, setInput] = useState(() => {

        // If settings are provided, parse them, otherwise use defaults
        if (byoSettings) {

            // Decode the settings
            let paramInput = Buffer.from(byoSettings, 'base64').toString('ascii');

            // Return the parsed settings
            return JSON.parse(paramInput);

        } else {

            // Return the default settings
            return {
                customWord: "",
                wordLength: 5,
                maxAttempts: 6
            };
        }
    });

    // Form input error on custom words
    const [inputError, setInputError] = useState("");

    // Loading state (Default to true if classic game type)
    const [isLoading, setIsLoading] = useState(gameType === "classic" ? true : false);

    // Is copied state
    const [isCopied, setIsCopied] = useState(false);

    // Start the game if it is a daily, classic, or shared byo game
    useEffect(() => {
        if (["daily", "classic"].includes(gameType) || byoSettings) {
            startGame();
        }
    }, []);

    // Handle input change
    async function onChange(event) {
        if (event.target.name === "customWord") {
            // Set custom word in all caps and update word length
            setInput(
                {
                    ...input,
                    [event.target.name]: event.target.value.toUpperCase(),
                    wordLength: event.target.value.length
                });
        } else {
            // Update the input
            setInput(
                {
                    ...input,
                    [event.target.name]: event.target.value
                });
        }

    }

    // Reset the settings
    function resetSettings(event) {
        event.preventDefault();
        setInput(
            {
                customWord: "",
                wordLength: 5,
                maxAttempts: 6
            }
        );
    }

    // Check if a form is valid
    async function isValidBYOForm() {

        // Set error to empty
        let error = "";

        // Ensure the word length is within bounds
        if (input.customWord.length < 3 || input.customWord.length > 15) {
            error = "Please enter a word between 3 and 15 letters.";
        }

        // Ensure only alphabet (ensure no whitespace)
        if (!error) {
            for (let i = 0; i < input.customWord.length; i++) {
                if (!"ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(input.customWord[i].toUpperCase())) {
                    error = "Please enter a valid word only containing letters A-Z.";
                }
            }
        }

        // Ensure the word is in the dictionary
        if (!error && !(await DictionaryService.isValidWord(input.customWord).then(isValid => isValid).catch(err => false))) {
            error = "Please enter a word found in our dictionary.";
        }

        // Return if valid
        if (error) {
            setInputError(error);
            return false;
        } else {
            setInputError("");
            return true;
        }
    }

    // Handle form submission
    async function handleSubmitOnStartGame(event) {
        // Prevent default button handling
        event.preventDefault();

        // Start game
        startGame();
    }

    // Start the game
    function startGame() {

        // Set board to loading
        setIsLoading(true);

        // Start the game based on the game type
        switch (gameType) {
            case "daily":
                startDailyGame();
                break;
            case "classic":
            case "custom":
            case "byo":
                startGameFromInput();
                break;
        }
    }

    // Start the daily game.
    async function startDailyGame() {

        // Get the daily word
        let sol = await DailyWordService.getDailyWord();

        // Set the board
        setBoard(
            <GameBoard
                status="IN_PROGRESS"
                solution={sol}
                attempts={6}
                resetGame={resetGame}
            />
        );

        // Set loading to false
        setIsLoading(false);
    }

    // Start the game from the input (Input defaults to a classic game)
    // This method works for both classic and custom games.
    async function startGameFromInput() {
        // Get the word for the game
        let word = gameType === "byo" ? input.customWord : await getGeneratedWord(input.wordLength);

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
    }

    // Get the url for the shared game
    function getUrl() {
        return window.location.href + "/" + Buffer.from(JSON.stringify(input)).toString('base64');
    }

    // Copy the url to the clipboard
    async function copyUrl(event) {
        // Prevent default button handling
        event.preventDefault();

        // Ensure the form is valid
        if (await isValidBYOForm() === false) return;

        // Copy the url to the clipboard
        let url = getUrl();

        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(url);
        } else {
            document.execCommand('copy', true, url);
        }

        // Set is copied to true
        setIsCopied(true);

        // From is copied popup after 5s
        setTimeout(() => {
            setIsCopied(false);
        }, 5000);
    }

    // Share the url
    async function shareUrl(event) {

        // Prevent default button handling
        event.preventDefault();

        // Ensure the form is valid
        if (await isValidBYOForm() === false) return;

        // Copy the url to the clipboard
        let url = getUrl();

        // Share the url
        if (navigator.share) {
            await navigator.share({
                title: "Jordle",
                text: "Try to beat this Jordle: ",
                url: url,
            });
        }
    }

    // Get a generated word
    async function getGeneratedWord(wordLength) {
        // Determine best word generator for word
        let generatorService = wordLength <= 9 ? ShortWordGeneratorService : WordGeneratorService;

        // await the word
        let word = await generatorService.generateWord(wordLength)
            .then(async (word) => {
                return await DictionaryService.isValidWord(word)
                    .then(isValid => isValid ? word : "")
                    .catch(err => {
                        console.log(err);
                        return "";
                    });
            })
            .catch((err) => {
                console.log(err);
                return "";
            });

        // Return the word, if it is invalid, recursively call this method again
        return word !== "" ? word : await getGeneratedWord(wordLength);
    }

    // Reset the game board
    function resetGame() {
        // Set board to null (will show form again if a custom game)
        setBoard(null);

        // Return to home page if daily or byo
        if (["daily", "byo"].includes(gameType)) navigate('/');

        // Start classic game again
        if (gameType === "classic") startGame();
    }

    // Return control panel JSX
    return (
        <div className="control-panel">

            {/* Loading spinner */}
            {isLoading &&
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            {/* Game Details */}
            {!board && !isLoading &&
                <div className="control-details">

                    {/* Start Game Form */}
                    {!board &&
                        <div className="row justify-content-center align-items-center">

                            <div className="col-12 col-md-6">


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

                                {/* Form */}
                                <form>

                                    {/* Reset button */}
                                    <div className="text-end mt-3">
                                        <button type="button" className="jordle-icon" onClick={resetSettings}>
                                            {/* Font awesome reset icon */}
                                            <i className="fas fa-undo-alt"></i>
                                        </button>
                                    </div>

                                    {/* Custom word input (only for byo game type) (min 3, max 15)*/}
                                    {gameType === "byo" &&
                                        <>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="custom-word">Custom Word</label>
                                                <br />
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="custom-word"
                                                    name="customWord"
                                                    minLength={1}
                                                    maxLength={15}
                                                    onChange={onChange}
                                                    placeholder="Enter a custom word"
                                                    value={input.customWord}
                                                />

                                                {/* Error message */}
                                            </div>
                                            {inputError !== "" &&
                                                <div className="mt-3">
                                                    <span className="input-error">{inputError}</span>
                                                </div>
                                            }
                                        </>
                                    }

                                    {/* Input of number slider (min 3, max 15) */}
                                    <div className="my-3">
                                        <label className="form-label" htmlFor="word-length">Word Length ({input.wordLength})</label>
                                        <br />
                                        <input
                                            disabled={gameType === "byo"}
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
                                    <div className="my-3">
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
                                    <div className="my-3">

                                        {gameType !== "byo" &&
                                            <button type="submit" className="jordle-button" onClick={handleSubmitOnStartGame} >
                                                <i className="fa fa-play fa-fw me-2"></i>
                                                Start Game
                                            </button>
                                        }

                                        {gameType === "byo" &&
                                            <>
                                                {/* Display copy link | share button */}
                                                <div className="row justify-content-between align-items-center">

                                                    <div className="col">

                                                        <button type="submit" className="jordle-button" onClick={shareUrl}>
                                                            <i className="fa fa-arrow-up-from-bracket fa-fw me-2"></i>
                                                            Share
                                                        </button>
                                                    </div>

                                                    {/* Display copy link if not mobile */}
                                                    {!isMobile &&
                                                        <div className="col text-end">
                                                            <button disabled={isCopied} type="submit" onClick={copyUrl} className="jordle-button">
                                                                <i className="fa fa-copy fa-fw me-2"></i>
                                                                Copy Link
                                                            </button>
                                                        </div>
                                                    }

                                                </div>

                                                {/* Display copied text */}
                                                {isCopied &&
                                                    <div className="text-end mt-2">
                                                        <span className="copied-word">Link copied to clipboard!</span>
                                                    </div>
                                                }
                                            </>
                                        }

                                    </div>

                                </form>
                            </div>
                        </div>
                    }
                </div >
            }

            {/* Game Board */}
            {board}
        </div >
    );
};

// Export control panel
export default ControlPanel;