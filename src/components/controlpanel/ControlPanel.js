import GameBoard from "../board/GameBoard";
import React from "react";

const ControlPanel = () => {

    // Create Game Board

    return (
        <div className="control-panel">

            {/* Control Panel Header */}
            <div className="text-center">
                <h2>Control Panel</h2>
                <p>Modify game settings from here.</p>
            </div>

            {/* Game Board */}
            <div>
                <GameBoard
                    status="IN_PROGRESS"
                    solution="JUICE"
                    attempts="6"
                />
            </div>
        </div>
    );
};

export default ControlPanel;