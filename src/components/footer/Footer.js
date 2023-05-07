import './Footer.scss';

function Footer() {

    return (
        // Footer container
        <div className="footer pb-3">
            <div className="container-sm">

                {/* Center content */}
                <div className="d-flex justify-content-center align-items-center text-center">

                    {/* Link to project repo on GitHub */}
                    <a href="https://github.com/joelsmith-2019/jordle" target="_blank" rel="noopener noreferrer">
                        Designed and Developed by Joel Smith
                    </a>
                </div>
            </div>
        </div>
    );
}

// Export Footer
export default Footer;