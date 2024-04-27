import BackgroundImage from './assets/background.png'
import SearchIcon from './assets/search_icon.jpg'

import LandingPageHeading from './LandingPageHeading'

import Navbar from './Navbar'
import ServiceTypeList from './ServiceTypeList'
import FeaturedListingGrid from '../Listings/FeaturedListingGrid'
import TopReviewsGrid from '../Reviews/TopReviewsGrid'

function LandingPage() {   
    return (
        <div>
            <Navbar />
            <LandingElement />
            <ServiceTypes />
            <FeaturedListings />
            <TopReviews />
            <Footer />
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
                    type="search"
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

function ServiceTypes() {
    return (
        <div className="flex flex-col items-center justify-evenly text-center w-screen bg-gray-300 h-96">
            <LandingPageHeading text="Services we offer" />
            <ServiceTypeList elements_to_display={5} />
        </div>
    )
}

function FeaturedListings() {
    return (
        <div className="flex flex-col items-center text-center justify-evenly w-screen h-auto">
            <LandingPageHeading text="Featured Listings" className="my-10"/>
            <FeaturedListingGrid cols={5} />
        </div>
    )
}

function TopReviews() {
    return (
        <div className="flex flex-col items-center text-center justify-evenly w-screen h-auto bg-blue-100">
            <LandingPageHeading text="What others say about us:" className="mt-8"/>
            <TopReviewsGrid cols={5}/>
        </div>
    );
}

function Footer() {
    return (
        <footer className="flex flex-row justify-between bg-black py-1 text-white text-center">
            <p>&copy; 2024 All rights reserved</p>
            <p> Tech-911</p>
        </footer>
    );
}


export default LandingPage;