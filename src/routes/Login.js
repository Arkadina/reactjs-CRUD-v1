import React, { useState } from "react";
import firebase from "firebase";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnSubmit = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Usuário logado.");
            })
            .catch((err) => {
                console.log("Erro.");
            });
    };
    return (
        <div className="register-form-container">
            <h1>Entrar</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    defaultValue=""
                    onChange={(e) => {
                        setEmail(e.target.value, email);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                    onChange={(e) => {
                        setPassword(e.target.value, password);
                    }}
                />

                <div>
                    <p>
                        <Link to="/" className="link-login">
                            Quero criar conta
                        </Link>
                    </p>
                </div>
                <div>
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
