import Header from "../nav/Header"
import Footer from "../nav/footer"

import "./Login.css"

function Login(){
    return(
        <>
            <Header></Header>
            <main>
                <section className="center">
                    <h1>Se connecter</h1>
                    <form action="" className="login-form">
                        <input type="text" placeholder="Email"/>
                        <input type="text" placeholder="Password"/>
                        <input type="submit" value="Se connecter" />
                    </form>
                    <a className="mdp-oublie" href="#">Mot de passe oublié ?</a>
                    <p className="creer-compte">Vous n'avez pas de compte ? Vous pouvez en <a href="#">créer un</a></p>
                </section>
            </main>
            <Footer></Footer>
        </>
    )
}

export default Login