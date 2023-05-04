import React, { useContext, useEffect, useState } from 'react';
import './Keyboard.scss';
import { GameContext } from '../gameboard/GameBoard';

// Keyboard component
const Keyboard = () => {

    // Game context
    const context = useContext(GameContext);

    // State for keys
    const [keys, setKeys] = useState(null);

    // 2D array of rows and letters
    let letters = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]
    ];

    // Get keys on a row
    const getKeysOnRow = (row) => {
        // Array of keys
        let keys = [];

        // Loop through letters on row
        for (let i = 0; i < letters[row].length; i++) {

            // Get key
            let key = letters[row][i];

            // Icon for key
            let icon = key === 'Enter' ? <i className="fa-solid fa-arrow-up px-3"></i> :
                key === 'Backspace' ? <i className="fa fa-delete-left px-3"></i> :
                    key;

            // Class name for keyboard, will show letter color
            let classNames = 'keyboard-key ' + context.letterClasses.get(key);

            // Add key to row
            keys.push(<div key={i} id={`key-${key}`} className={classNames}
                onClick={
                    () => {
                        context.keyFunc(new KeyboardEvent('keydown', { key: key }));
                    }
                }>{icon}</div>);
        }

        // Return keys
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

    // Update keys when letter classes change
    useEffect(() => {
        // console.log('**** Keyboard useEffect ****');
        // console.log(context.letterClasses);
        // console.log('Rebuilding keyboard...');
        setKeys(getAllKeys());
    }, [context.letterClasses, context.keyFunc]);

    // Return keyboard
    return (
        <div className="keyboard">
            {keys}
        </div>
    );
}

// Export keyboard
export default Keyboard;