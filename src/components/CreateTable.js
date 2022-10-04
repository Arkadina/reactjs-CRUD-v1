import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTable.css";

import firebase from "firebase";

function CreateTable() {
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const currentUser = firebase.auth().currentUser;
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        setBooks();
    }

    function setBooks() {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid);

        userRef
            .get()
            .then((doc) => {
                let crudData = [];

                if (doc.data().crudData[0] === "") {
                    console.log("crudData[0]");
                    crudData.push({
                        id: 1,
                        book: book,
                        author: author,
                    });

                    userRef.update({
                        crudData,
                    });
                } else {
                    crudData = [
                        ...doc.data().crudData,
                        {
                            id:
                                doc.data().crudData[
                                    doc.data().crudData.length - 1
                                ].id + 1,
                            book: book,
                            author: author,
                        },
                    ];

                    userRef.update({
                        crudData,
                    });
                }
                navigate("/home");
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
        <div className="table">
            <form className="table-form" onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    id="book-id"
                    placeholder="Livro"
                    onChange={(e) => {
                        setBook(e.target.value, book);
                    }}
                />
                <input
                    type="text"
                    id="book-author"
                    placeholder="Autor"
                    onChange={(e) => {
                        setAuthor(e.target.value, author);
                    }}
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}

export default CreateTable;
