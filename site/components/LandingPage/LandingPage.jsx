import BackgroundImage from './assets/background.png'
import SearchIcon from './assets/search_icon.jpg'

import Navbar from './Navbar'
// import LandingPageHeading from './LandingPageHeading'

function LandingPage() {   
    return (
        <div>
            <Navbar />
            <LandingElement />
        </div>
    )
}

function LandingElement() {
    return (
        <div className="w-screen h-screen text-white flex flex-col items-left justify-center px-8" style={{backgroundImage: `url(${BackgroundImage})`}}>
            <div className="text-5xl font-bold">
                <h1>
                    Tech in trouble?
                </h1>
                <h1>
                    Our trusted experts solve it fast
                </h1>
                <h1>
                    Don&apos;t let glitches hold you back.
                </h1>
                <p className="text-lg font-normal mt-2">Get expert tech help now.</p>
            </div>
            <div className="flex items-center text-black">
                <input
                    className="mt-4 rounded-l-xl pl-2 py-1 h-12 w-96 border-black border-2 border-r-0"
                    placeholder="What service do you need?"
                />
                <img
                    className="mt-4 h-12 rounded-r-xl border-black border-2 border-l-0"
                    src={SearchIcon}
                />
                <button className="h-12 w-32 mt-4 ml-5 rounded-xl px-3 py-1 bg-white border-black border-2">
                    Search
                </button>
            </div>
        </div>
    )
}



export default LandingPage;