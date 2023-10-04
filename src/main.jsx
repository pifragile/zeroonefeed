import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Feed from "./Feed.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/soldout" element={<Feed soldout={true} />} />
        </Routes>
    </BrowserRouter>
);
