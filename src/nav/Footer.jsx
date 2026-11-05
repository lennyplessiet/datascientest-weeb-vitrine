import "./Footer.css"
import { Link } from "react-router-dom"

import weebBlackLogo from "../assets/weeb-black.svg"
import youtubeIcon from "../assets/icon/youtube.svg"
import facebookIcon from "../assets/icon/facebook.svg"
import twitterIcon from "../assets/icon/twitter.svg"
import instagramIcon from "../assets/icon/instagram.svg"
import linkedinIcon from "../assets/icon/linkedin.svg"

function Footer(){
    return(
        <>
            <footer>
                <div className="footer-nav">
                    <div>
                        <Link to="/"><img src={weebBlackLogo} alt="Weeb" /></Link>
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
                        <a href="https://www.youtube.com/"><img src={youtubeIcon} alt="YouTube" /></a>
                        <a href="https://www.facebook.com/"><img src={facebookIcon} alt="Facebook" /></a>
                        <a href="https://x.com/"><img src={twitterIcon} alt="Twitter" /></a>
                        <a href="https://www.instagram.com/"><img src={instagramIcon} alt="Instagram" /></a>
                        <a href="https://www.linkedin.com/"><img src={linkedinIcon} alt="LinkedIn" /></a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
