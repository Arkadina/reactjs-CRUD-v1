import React, { useEffect, useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

import firebase from "firebase";

import "./Table.css";

function Table() {
    const authValue = useContext(AuthContext);
    const { currentUser } = authValue;

    const [tableData, setTableData] = useState(null);
    const [editTable, setEditTable] = useState(false);
    const [newBook, setNewBook] = useState(null);
    const [newAuthor, setNewAuthor] = useState(null);
    const [updateItem, setUpdateItem] = useState(null);

    useEffect(() => {
        getData();
    }, [tableData]);

    async function getData() {
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid);

        await userRef.get().then((doc) => {
            setTableData(doc);
        });
    }

    async function handleDeleteItem(id) {
        let newTableData = [];
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid);

        tableData.data().crudData.map((item) => {
            if (item.id !== id) {
                newTableData.push(item);
            }
        });

        if (newTableData.length === 0) {
            await userRef.update({
                crudData: [""],
            });
        } else {
            await userRef.update({
                crudData: newTableData,
            });
        }
    }

    function handleUpdateItem(doc) {
        setUpdateItem(doc);
        setEditTable(true);
    }

    function handleUpdateTable(e) {
        let newArray = tableData.data().crudData;
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid);

        e.preventDefault();

        if (newBook === null && newAuthor === null) {
            setEditTable(false);
        } else {
            newArray.forEach((item, index) => {
                if (item.id === updateItem.id) {
                    newArray[index] = {
                        id: updateItem.id,
                        book: newBook ? newBook : updateItem.book,
                        author: newAuthor ? newAuthor : updateItem.author,
                    };
                }
            });

            userRef
                .update({
                    crudData: newArray,
                })
                .then(() => {
                    setEditTable(false);
                });
        }
    }

    if (editTable) {
        return (
            <div className="table">
                <div className="table">
                    <form className="table-form" onSubmit={handleUpdateTable}>
                        <input
                            type="text"
                            id="book-id"
                            placeholder="Livro"
                            defaultValue={updateItem.author}
                            onChange={(e) => {
                                setNewBook(e.target.value, newBook);
                            }}
                        />
                        <input
                            type="text"
                            id="book-author"
                            placeholder="Autor"
                            defaultValue={updateItem.author}
                            onChange={(e) => {
                                setNewAuthor(e.target.value, newAuthor);
                            }}
                        />
                        <button
                            type="submit"
                            style={{ backgroundColor: "#1C6758" }}
                        >
                            Editar
                        </button>
                    </form>
                </div>
            </div>
        );
    } else {
        if (tableData) {
            return (
                <div className="table">
                    {tableData.data().crudData[0] === "" ? (
                        <div className="talbe-no-data">
                            <h1>Nenhum livro foi adicionado ainda!</h1>
                            <p>
                                Crie
                                <NavLink
                                    className="navlink-table"
                                    to="/home/add"
                                >
                                    Aqui
                                </NavLink>
                            </p>
                        </div>
                    ) : (
                        <table className="books-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Livro</th>
                                    <th>Autor</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.data().crudData.map((doc, index) => {
                                    return (
                                        <tr>
                                            <td>{doc.id}</td>
                                            <td>{doc.book}</td>
                                            <td>{doc.author}</td>
                                            <td>
                                                <button
                                                    className="btn btn-editar"
                                                    onClick={() =>
                                                        handleUpdateItem(doc)
                                                    }
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-excluir"
                                                    onClick={() =>
                                                        handleDeleteItem(doc.id)
                                                    }
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            );
        } else {
            return <div className="table">Carregando...</div>;
        }
    }
}

export default Table;
