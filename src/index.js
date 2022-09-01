import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";

// React router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/route/PrivateRoute";

// Pages
import Identification from "./pages/Identification";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<App />} />
                </Route>
                <Route path="/" element={<Identification />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
