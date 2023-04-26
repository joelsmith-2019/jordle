import React from 'react';
import './Keyboard.scss';

// Keyboard component
const Keyboard = () => {

    let letters = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        [<i className="fa-solid fa-arrow-up px-3"></i>, "z", "x", "c", "v", "b", "n", "m", <i className="fa fa-delete-left px-3"></i>]
    ];

    // Get keys on a row
    const getKeysOnRow = (row) => {
        let keys = [];

        for (let i = 0; i < letters[row].length; i++) {
            keys.push(<div key={i} className="keyboard-key">{letters[row][i]}</div>);
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