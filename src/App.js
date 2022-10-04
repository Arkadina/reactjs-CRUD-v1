import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";

import { createContext, Fragment, useEffect, useState } from "react";

import firebase from "firebase";
import "./config/firebaseConfig";

export const AuthContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    var authValue = {
        currentUser,
        userInfo,
    };

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                getVerifyUser(user);
            } else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        });
    }

    async function getVerifyUser(user) {
        const userRef = firebase.firestore().collection("users").doc(user.uid);

        const userData = await userRef.get();

        if (userData.exists) {
            console.log("Ok! Usuário já registrado.");
            setUserInfo(userData);
            return;
        } else {
            console.log("Registrando usuário no firebase.");
            userRef.set({
                email: user.email,
                emailVerified: user.emailVerified,
                crudData: [""],
            });
            setUserInfo(userData);
        }
    }

    if (isLoading) {
        return <div>carregado</div>;
    }

    return (
        <div className="App">
            <AuthContext.Provider value={authValue}>
                <Router>
                    {!currentUser ? <AuthRoutes /> : <UserRoutes />}
                    <Routes>
                        <Fragment>
                            <Route path="/" element={<Register />} />
                        </Fragment>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Login />} />
        </Routes>
    );
}

function UserRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/add" element={<Home />} />
        </Routes>
    );
}

export default App;
