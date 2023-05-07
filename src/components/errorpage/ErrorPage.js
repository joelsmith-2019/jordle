import './ErrorPage.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {

    // Navigation hook
    const navigate = useNavigate();

    return (
        <div className="jordle-error-page mt-3">
            <h3>Page Not Found</h3>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button className="jordle-icon" onClick={() => navigate('/')}>
                <i className="fa fa-arrow-left fa-fw me-2"></i>
                <span>Back to Home</span>
            </button>
        </div>
    )
}

// Export the error page
export default ErrorPage;