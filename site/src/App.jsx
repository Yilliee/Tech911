import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";

import LandingPage from "../components/LandingPage/LandingPage";
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import SearchPage from "../components/SearchPage/SearchPage"
import ProfileEdit from "../components/ProfileEdit/ProfileEdit";
import ListingPage from "../components/Listings/ListingPage";
import TroubleshootingPage from "../components/Troubleshooting";
import SignOutPage from "../components/SignOutPage";
import CreateNewListing from "../components/Listings/CreateNewListing";

function App() {
    const Routes=createBrowserRouter([
        {path: "/", element: <LandingPage/>},
        {path: "/signin", element: <Login/>},
        {path: "/register", element: <Register />},
        {path: "/search", element: <SearchPage/>},
        {path: "/profile", element: <ProfileEdit />},
        {path: "/viewListing", element: <ListingPage />},
        {path: '/troubleshooting', element: <TroubleshootingPage />},
        {path: "/signout", element: <SignOutPage />},
        {path: '/createListing', element: <CreateNewListing />},
    ])

    return (
        <RouterProvider router={Routes}>
            <LandingPage/>
        </RouterProvider>
    );
}

export default App;
