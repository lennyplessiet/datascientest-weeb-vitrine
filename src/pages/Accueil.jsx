import Header from "../nav/Header"
import Footer from "../nav/Footer"

import "./Accueil.css"

function Accueil(){
    return(
        <>
            <Header></Header>
            <main>
                <section className="center">
                    <h1>Explorez le <span>Web</span> sous toutes ses <u>facettes</u></h1>
                    <p>Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.</p>
                    <div className="button-row">
                        <button>Découvrir les articles</button>
                        <button className="button-white">S'abonner à la newsletter</button>
                    </div>
                    <img src="/src/assets/Desktop.svg" alt="Desktop" />
                </section>
                <section className="center">
                    <h2>Ils nous font confiance</h2>
                    <div className="logo-row">
                        <div className="logo">
                            <img src="/src/assets/smartfinder-logo.svg" alt="smartfinder-logo" />
                            <p>SmartFinder</p>
                        </div>
                        <div className="logo">
                            <img src="/src/assets/zoomerr-logo.svg" alt="zoomerr-logo" />
                            <p>Zoomerr</p>
                        </div>
                        <div className="logo">
                            <img src="/src/assets/shells-logo.svg" alt="shells-logo" />
                            <p>Shells</p>
                        </div>
                        <div className="logo">
                            <img src="/src/assets/waves-logo.svg" alt="waves-logo" />
                            <p>Waves</p>
                        </div>
                        <div className="logo">
                            <img src="/src/assets/artvenue-logo.svg" alt="artvenue-logo" />
                            <p>ArtVenue</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="row">
                        <div className="column-50">
                            <p className="pre-title">Des ressources pour tous les niveaux</p>
                            <h2><span>Apprenez</span> et <span>progressez</span></h2>
                            <p>Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.</p>
                            <a href="#" className="call-to-action">Explorer les ressources</a>
                        </div>
                        <div className="column-50">
                            <img src="/src/assets/Desktop.svg" alt="Desktop" />
                        </div>
                    </div>
                </section>
                <section>
                    <div className="row gap-80">
                        <div className="column-30">
                            <img src="/src/assets/Shapes.svg" alt="Shapes" />
                        </div>
                        <div className="column-70">
                            <p className="pre-title">Le web, un écosystème en constante évolution</p>
                            <h2>Restez informé des dernières <span>tendances</span></h2>
                            <p>Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !</p>
                            <a href="#" className="call-to-action">Lire les articles récents</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Accueil