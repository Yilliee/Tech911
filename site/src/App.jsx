import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";

import LandingPage from "../components/LandingPage/LandingPage";
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import SearchPage from "../components/SearchPage/SearchPage"
import ListingPage from "../components/Listings/ListingPage";

import { useEffect } from "react";
import { clearUserDetails } from "./utils";

function App() {
    const Routes=createBrowserRouter([
        {path: "/", element: <LandingPage/>},
        {path: "/signin", element: <Login/>},
        {path: "/register", element: <Register />},
        {path: "/search", element: <SearchPage/>},
        {path: "/viewListing", element: <ListingPage />},
    ])

    return (
        <RouterProvider router={Routes}>
            <LandingPage/>
        </RouterProvider>
    );
};

export default App;
