import React, { useContext, useRef } from 'react';
import './Keyboard.scss';
import { GameContext } from '../gameboard/GameBoard';

// Keyboard component
const Keyboard = () => {

    let context = useContext(GameContext);

    const ref = useRef(null);

    // 2D array of rows and letters
    let letters = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
    ];

    // Enter Icon:
    // <i className="fa-solid fa-arrow-up px-3"></i>
    // Backspace Icone:
    // <i className="fa fa-delete-left px-3"></i>

    // Handle key press
    function onKeyPress(key) {
        console.log('Pressed key: ' + key);
        context.onKeyPress(new KeyboardEvent('keydown', { key: key }));
    }

    // Get keys on a row
    const getKeysOnRow = (row) => {
        let keys = [];

        for (let i = 0; i < letters[row].length; i++) {

            let key = letters[row][i];

            let icon = key === 'Enter' ? <i className="fa-solid fa-arrow-up px-3"></i> : key === 'Backspace' ? <i className="fa fa-delete-left px-3"></i> : key;

            keys.push(<div key={i} id={`key-${key}`}className="keyboard-key" onClick={() => onKeyPress(key)}>{icon}</div>);
        }

        return keys;
    }

    // Get all keys, grouped by rows
    const getAllKeys = () => {
        let keys = [];

        for (let i = 0; i < letters.length; i++) {
            keys.push(<div key={i} className="keyboard-row">{getKeysOnRow(i)}</div>);
        }

        return keys;
    }

    // Return keyboard
    return (
        <div className="keyboard">
            {getAllKeys()}
        </div>
    );
}

// Export keyboard
export default Keyboard;