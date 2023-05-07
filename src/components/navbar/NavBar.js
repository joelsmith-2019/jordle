import './NavBar.scss';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    // Navigation hook
    let navigate = useNavigate();

    // Return NavBar JSX
    return (
        <nav id="navbar" className="navbar navbar-expand-md">
            <div className="container-sm">

                <div className="mx-auto">
                    <span className="nav-logo" onClick={() => navigate('')}>Jordle</span>
                </div>

            </div>
        </nav>
    );
}

// Export NavBar
export default NavBar;