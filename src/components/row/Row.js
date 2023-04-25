import Cell from "../cell/Cell";
import React, { useContext } from "react";
import { GameContext } from "../board/GameBoard";

const Row = ({ rowIndex }) => {

    const context = useContext(GameContext);

    function getCells() {
        let cells = [];
        for (let i = 0; i < context.solution.length; i++) {
            cells.push(<Cell key={i} rowIndex={rowIndex} cellIndex={i} />);
        }
        return cells;
    }

    // Return JSX for Row
    return (
        <div className="d-flex justify-content-center align-items-center">
            {getCells()}
        </div>
    );
}

export default Row;