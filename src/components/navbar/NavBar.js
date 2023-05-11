import './NavBar.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function NavBar() {

    // Navigation hook
    const navigate = useNavigate();

    // Modal state
    const [modal, setModal] = useState(null);

    // Modal popup content
    const modalContent = {
        info: {
            title: 'Welcome to Jordle',
            body:
                <>
                    {/* Rules overview */}
                    <div>
                        <h6>How to Play</h6>
                        <span>
                            The goal of the game is to discover the hidden word within a set number of guesses.
                            Each guess you make must be a valid word of the same length as the hidden word. Each
                            guess will reveal colored tiles signifying how close your guess is to the solution.
                            The game ends when you discover the hidden word or run out of guesses. Good luck!
                        </span>
                    </div>

                    {/* Examples */}
                    <div className="mt-3">
                        <h6>Examples</h6>
                        <div className="mt-3">
                            <div className="game-row justify-content-start">
                                <div className="game-cell correct-letter reveal-cell">A</div>
                                <div className="game-cell">P</div>
                                <div className="game-cell">P</div>
                                <div className="game-cell">L</div>
                                <div className="game-cell">E</div>
                            </div>
                            <span>
                                The <b>A</b> is in the solution and in the correct position.
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="game-row justify-content-start">
                                <div className="game-cell">G</div>
                                <div className="game-cell">R</div>
                                <div className="game-cell contains-letter reveal-cell">O</div>
                                <div className="game-cell">U</div>
                                <div className="game-cell">P</div>
                            </div>
                            <span>
                                The <b>O</b> is in the solution but in the wrong position.
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="game-row justify-content-start">
                                <div className="game-cell">S</div>
                                <div className="game-cell">C</div>
                                <div className="game-cell">O</div>
                                <div className="game-cell">R</div>
                                <div className="game-cell invalid-letter reveal-cell">E</div>
                            </div>
                            <span>
                                The <b>E</b> is not in the solution.
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="game-row justify-content-start">
                                <div className="game-cell contains-letter reveal-cell">G</div>
                                <div className="game-cell invalid-letter reveal-cell">R</div>
                                <div className="game-cell correct-letter reveal-cell">E</div>
                                <div className="game-cell contains-letter reveal-cell">A</div>
                                <div className="game-cell invalid-letter reveal-cell">T</div>
                            </div>
                            <span>
                                Altogether, a guess may appear as so.
                            </span>
                        </div>
                        <div className="mt-3">
                            <div className="game-row justify-content-start">
                                <div className="game-cell contains-letter reveal-cell">S</div>
                                <div className="game-cell invalid-letter reveal-cell">O</div>
                                <div className="game-cell invalid-letter reveal-cell">U</div>
                                <div className="game-cell invalid-letter reveal-cell">P</div>
                                <div className="game-cell contains-letter reveal-cell">S</div>
                            </div>
                            <span>
                                <b>Note:</b> The solution will contain every yellow tile.
                                If two <b>S</b>'s are yellow, then they will both be in the
                                solution.
                            </span>
                        </div>
                    </div>
                </>,
            footer:
                <>
                    <div className="author text-center mx-auto">
                        <a href="https://github.com/joelsmith-2019/jordle" target="_blank" rel="noopener noreferrer">
                            Website Designed and Developed by Joel Smith
                        </a>
                    </div>
                </>
        }
    };

    // Return NavBar JSX
    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-md">
                <div className="container-sm">

                    {/* Logo */}
                    <div className="">
                        <span className="nav-logo" onClick={() => navigate('')}>Jordle</span>
                    </div>

                    {/* Info Modal */}
                    <button className="jordle-icon" data-bs-toggle="modal" data-bs-target="#modal"
                        onClick={() => setModal(modalContent.info)}>
                        <i className="fa-sharp fa-solid fa-question fa-fw"></i>
                    </button>
                </div>

            </nav>

            {/* Modal Popup */}
            <div className="modal fade" id="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* Only display content if modal has been set */}
                        {modal &&
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{modal.title}</h5>

                                    <button type="button" className="jordle-icon" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="fa-sharp fa-solid fa-times fa-fw"></i>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    {modal.body}
                                </div>

                                {/* Submission button */}
                                {modal.footer &&
                                    <div className="modal-footer">
                                        {modal.footer}
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

// Export NavBar
export default NavBar;