import GameBoard from "../gameboard/GameBoard";
import React, { useState } from "react";
import "./ControlPanel.scss";

const ControlPanel = () => {

    // Refresh Game board
    const [board, setBoard] = useState(
        <GameBoard
            status="IN_PROGRESS"
            solution="SMITH"
            attempts="6"
        />
    );

    function onRefresh() {
        console.log('Creating new board...');
        setBoard(
            <GameBoard
                status="IN_PROGRESS"
                solution="SMITH"
                attempts="6"
            />
        );
    }

    return (
        <div className="control-panel">

            {/* Control Panel Header */}
            <div className="control-details text-center">
                <h2>Control Panel</h2>
                <p>Modify game settings from here.</p>
            </div>

            {/* Game Board */}
            {board}

            <div className="text-center">
                <button className="btn btn-primary" onClick={onRefresh}>Refresh</button>
            </div>
        </div>
    );
};

export default ControlPanel;