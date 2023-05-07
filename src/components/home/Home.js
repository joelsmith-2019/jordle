import './Home.scss';
import { useNavigate } from 'react-router-dom';

// Define home
function Home() {

    // Navigation hook
    let navigate = useNavigate();

    // Return Home JSX
    return (
        <div>
            <div className="text-center">
                <h1>Welcome to Jordle</h1>
                <p>Please select a game type from below to begin!</p>
            </div>

            <div className="row justify-content-center">

                <div className="col-12 col-sm-5">
                    <div className="game-type" onClick={() => navigate('/classic')}>
                        <h3>Standard Game</h3>
                        <p>5-letter words and 6 attempts</p>
                    </div>
                </div>

                <div className="col-12 col-sm-5 mt-3 mt-sm-0">
                    <div className="game-type" onClick={() => navigate('/custom')}>
                        <h3>Custom Games</h3>
                        <p>3-15 letter words and up to 15 attempts</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

// Export home
export default Home;