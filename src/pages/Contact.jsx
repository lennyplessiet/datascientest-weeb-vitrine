import Header from "../nav/Header"
import Footer from "../nav/footer"

import "./Contact.css"

function Contact(){
    return(
        <>
        <Header></Header>
        <main>
            <section className="center">
                <h1>Votre avis compte !</h1>
                <p>Votre retour est essentiel pour nous améliorer ! Partagez votre expérience, dites-nous ce que vous aimez et ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus utile et enrichissante. </p>
                <form className="contact-form" action="">
                    <div className="form-row">
                        <input type="text" placeholder="Nom"/>
                        <input type="text" placeholder="Prénom"/>
                    </div>
                    <div className="form-row">
                        <input type="text" placeholder="Téléphone"/>
                        <input type="text" placeholder="Email"/>
                    </div>
                    <div className="form-row">
                        <textarea name="Message" id="Message" placeholder="Message"></textarea>
                    </div>
                    <div className="form-row">
                        <input type="submit" value="Contact" />
                    </div>
                </form>
            </section>
        </main>
        <Footer></Footer>
        </>
    )
}

export default Contact