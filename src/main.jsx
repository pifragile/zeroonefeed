import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stats from "./components/Stats.jsx";
import Feed from "./components/Feed.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/soldout" element={<Feed soldout={true} />} />
            <Route path="/stats" element={<Stats />} />
        </Routes>
    </BrowserRouter>
);
