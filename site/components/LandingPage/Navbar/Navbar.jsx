import Logo from '../../../src/assets/react.svg'

function LandingPageNavbar() {
    return (
        <nav className="w-screen flex items-center justify-between bg-black text-white p-4 font-bold">
            <div className="flex items-center justify-between">
                <div className="flex items-center" onClick={() => {console.log("Navigate to Landing Page")}}>
                    <img src={Logo} alt="Logo" className="h-8 w-8" />
                    <h1 className="ml-2 text-xl">Tech - 911</h1>
                </div>
                <div className="flex items-center ml-4">
                    <a href="/listings" className="mr-4">View All Listings</a>
                    <a href="/tips" className="mr-4">Troubleshooting Tips</a>
                    <a href="/track" className="mr-4">Track Order</a>
                </div>
            </div>
            <button className="bg-white text-black rounded-lg px-4 py-2">Sign In</button>
        </nav>
    );
}

export default LandingPageNavbar;
