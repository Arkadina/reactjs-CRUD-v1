import React from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Table from "../components/Table";
import CreateTable from "../components/CreateTable";

import "./Home.css";

import { ROUTES_TYPE } from "../constants/routes.type";

function Home() {
    const { pathname } = useLocation();

    function MainContent({ pathname }) {
        switch (pathname) {
            case ROUTES_TYPE.add:
                return <CreateTable />;
            default:
                return <Table />;
        }
    }

    return (
        <div className="home">
            <Header />
            <main className="home-main">
                <MainContent pathname={pathname} />
            </main>
        </div>
    );
}

export default Home;
