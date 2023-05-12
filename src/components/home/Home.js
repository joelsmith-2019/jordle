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

                {/* Daily Jordle Games */}
                <div className="col-10 col-sm-5 my-3">
                    <div className="game-type" onClick={() => navigate('/daily')}>
                        <h3>Daily Jordle</h3>
                        <p>Guess a 5-letter word in 6 attempts. New word every day at midnight.</p>
                    </div>
                </div>

                {/* Classic Jordle Games */}
                <div className="col-10 col-sm-5 my-3">
                    <div className="game-type" onClick={() => navigate('/classic')}>
                        <h3>Classic Unlimited</h3>
                        <p>Guess an unlimited supply of the classic, 5-letter words in 6 attempts.</p>
                    </div>
                </div>

                {/* Custom Game */}
                <div className="col-10 col-sm-5 my-3">
                    <div className="game-type" onClick={() => navigate('/custom')}>
                        <h3>Custom Games</h3>
                        <p>You decide the difficulty of the match. Choose between an unlimited supply of 3-15 letter words with up to 15 attempts.</p>
                    </div>
                </div>

                {/* Build Your Own */}
                <div className="col-10 col-sm-5 my-3">
                    <div className="game-type" onClick={() => navigate('/byo')}>
                        <h3>Build Your Own</h3>
                        <p>Build your own game by choosing the word and the number of attempts. Then, challenge friends to solve your very own Jordle! </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

// Export home
export default Home;