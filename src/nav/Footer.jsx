import "./Footer.css"

function Footer(){
    return(
        <>
            <footer>
                <div className="footer-nav">
                    <div>
                        <a href="/"><img src="/src/assets/weeb-black.svg" alt="" /></a>
                    </div>
                    <div>
                        <p className="footer-title">Product</p>
                        <ul>
                            <li>Pricing</li>
                            <li>Overview</li>
                            <li>Browse</li>
                            <li>Accessibility</li>
                            <li>Five</li>
                        </ul>
                    </div>
                    <div>
                        <p className="footer-title">Solutions</p>
                        <ul>
                            <li>Brainstorming</li>
                            <li>Ideation</li>
                            <li>Wireframing</li>
                            <li>Research</li>
                        </ul>
                    </div>
                    <div>
                        <p className="footer-title">Resources</p>
                        <ul>
                            <li>Help Center</li>
                            <li>Blog</li>
                            <li>Tutorials</li>
                        </ul>
                    </div>
                    <div>
                        <p className="footer-title">Company</p>
                        <ul>
                            <li>About</li>
                            <li>Press</li>
                            <li>Events</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="footer-bottom">
                    <p>@ 2025 Weeb, Inc. All rights reserved.</p>
                    <div className="socials-link">
                        <a href="https://www.youtube.com/"><img src="/src/assets/icon/youtube.svg" alt="" /></a>
                        <a href="https://www.facebook.com/"><img src="/src/assets/icon/facebook.svg" alt="" /></a>
                        <a href="https://x.com/"><img src="/src/assets/icon/twitter.svg" alt="" /></a>
                        <a href="https://www.instagram.com/"><img src="/src/assets/icon/instagram.svg" alt="" /></a>
                        <a href="https://www.linkedin.com/"><img src="/src/assets/icon/linkedin.svg" alt="" /></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer