import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

import firebase from "firebase";

import "./Header.css";

function Header() {
    const authContext = useContext(AuthContext);
    const { currentUser } = authContext;

    const handleSignOut = () => {
        firebase.auth().signOut();
    };

    return (
        <div className="header">
            <div className="header-right-side">Logo</div>
            <div className="header-middle-side">
                <ul>
                    <li>
                        <NavLink
                            className="navlink-header"
                            to="/home"
                            style={({ isActive }) => {
                                if (isActive) {
                                    return {
                                        fontWeight: "600",
                                    };
                                }
                            }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/home/add"
                            className="navlink-header"
                            style={({ isActive }) => {
                                if (isActive) {
                                    return {
                                        fontWeight: "600",
                                    };
                                }
                            }}
                        >
                            Adicionar livro
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="header-left-side">
                {
                    <p>
                        Olá,{" "}
                        {currentUser ? (
                            <strong>{currentUser.email} (:</strong>
                        ) : (
                            "undefined"
                        )}
                    </p>
                }
                <button onClick={handleSignOut}>
                    <a>Sair</a>
                </button>
            </div>
        </div>
    );
}

export default Header;
