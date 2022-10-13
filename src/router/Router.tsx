import { Navigate, Route, Routes } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";

import { Home } from "../pages/Home";
import { About } from "../pages/About";

export function Router() {
    return (
        <ScrollToTop>
            <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </ScrollToTop>
    );
}