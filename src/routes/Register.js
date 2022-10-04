import React, { useState } from "react";
import firebase from "firebase";
import { useNavigate, Link } from "react-router-dom";

import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            console.log(password);
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("Usuário cadastrado com sucesso.");
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            firebase.auth().signOut();
                            navigate("/home");
                            window.location.reload();
                        }
                    });
                })
                .catch((err) => {
                    console.log("Erro.");
                });
        } else {
            alert("As senhas não conferem.");
        }
    };
    return (
        <div className="register-form-container">
            <h1>Criar Conta</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    defaultValue=""
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value, email)}
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value, password)}
                    placeholder="Password"
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) =>
                        setConfirmPassword(e.target.value, confirmPassword)
                    }
                ></input>

                <div>
                    <p>
                        <Link to="/home" className="link-login">
                            Já tenho conta
                        </Link>
                    </p>
                </div>

                <div>
                    <button type="submit">Criar conta</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
