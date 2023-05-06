import GameBoard from "../gameboard/GameBoard";
import React, { useState } from "react";
import "./ControlPanel.scss";
import WordGeneratorService from "../../services/WordGeneratorService";

const ControlPanel = () => {

    // Refresh Game board
    const [board, setBoard] = useState(null);

    // Reset the game board
    function resetGame() {
        console.log('resetting board...');
        setBoard(null);
    }

    // Perform logic to start a game
    function startGame() {

        WordGeneratorService.generateWord(9)
            .then((word) => {
                setBoard(
                    <GameBoard
                        status="IN_PROGRESS"
                        solution={word}
                        attempts="6"
                        resetGame={resetGame}
                    />
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="control-panel">

            {/* Control Panel Header */}
            {!board &&
                <div className="control-details text-center">
                    <h3>Control Panel</h3>
                    <p>Modify game settings from here.</p>

                    {/* Start Game Button */}
                    {!board &&
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={startGame}>Start Game</button>
                        </div>
                    }
                </div>
            }

            {/* Game Board */}
            {board}
        </div>
    );
};

export default ControlPanel;