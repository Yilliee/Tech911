import BackgroundImage from './assets/background.png'
import SearchIcon from './assets/search_icon.jpg'

import { useEffect, useState } from 'react'
import LandingPageHeading from './LandingPageHeading'

import Navbar from '../Navbar'
import ServiceTypeList from './ServiceTypeList'
import FeaturedListingGrid from '../Listings/FeaturedListingGrid'
import ReviewsGrid from '../Reviews/ReviewsGrid'

function LandingPage() {
    return (
        <div>
            <Navbar showAccountButtons={true} showSearchBar={false} />
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
        <div className="w-full h-screen text-white flex flex-col items-left justify-center px-8" style={{backgroundImage: `url(${BackgroundImage})`}}>
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
                    id='searchBarHome'
                />
                <img
                    className="mt-4 h-12 rounded-r-xl border-black border-2 border-l-0"
                    src={SearchIcon}
                />
                <button type='submit' className="h-12 w-32 mt-4 ml-5 rounded-xl px-3 py-1 bg-white border-black border-2">
                    Search
                </button>
            </div>
        </div>
    )
}

function ServiceTypes() {
    const [serviceTypes, setServiceTypes] = useState(null);
    const [deviceTypes, setDeviceTypes] = useState(null);

    useEffect(() => {
        if ( serviceTypes !== null )
            return;

        fetch('http://localhost:3000/getServiceTypes')
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
        })))
        .then(data => {
            setServiceTypes(data.status ? data.service_type_list: null);
        })
        .catch(error => {
            console.error(error);
        });
    });

    useEffect(() => {
        if ( deviceTypes !== null )
            return;

        fetch('http://localhost:3000/getDeviceTypes')
        .then(response => response.json().then(
            data => ({
                ...data,
                'status': response.status
        })))
        .then(data => {
            setDeviceTypes(data.status ? data.device_type_list : null);
        })
        .catch(error => {
            console.error(error);
        });
    });

    return (
        <div className="flex flex-col items-center justify-evenly text-center w-full bg-gray-300 h-96">
            <LandingPageHeading text="Services we offer" />
            {( serviceTypes === null || deviceTypes === null ) ?
                <h1 className='font-bold text-3xl my-12 text-center'>Loading...</h1>
              : <ServiceTypeList services={serviceTypes} devices={deviceTypes} elements_to_display={5} />
            }
        </div>
    )
}

function FeaturedListings() {
    const count_entries = 10;
    const [listings, setListings] = useState(null);

    useEffect(() => {
        if (listings !== null)
            return;

        fetch('http://localhost:3000/getListings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ featured_only: true, count: count_entries })
        })
        .then(response => response.json())
        .then(listingData => {
            const result = listingData.map(listing => (
                {
                    id: listing.id,
                    thumbnail: URL.createObjectURL(new Blob( [new Uint8Array(listing.thumbnail.data)], { type: 'image/jpeg' })),
                    title: listing.title,
                    price: listing.price,
                }
            ));

            setListings(result);
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    })

    return ( (listings === null) ? <h1 className='font-bold text-3xl my-12 text-center'>Loading...</h1> :
        <div className="flex flex-col items-center text-center justify-evenly w-full h-auto">
            <LandingPageHeading text="Featured Listings" className="my-10"/>
            <FeaturedListingGrid featuredListings={listings} cols={Math.min(5, listings.length)} />
        </div>
    )
}

function TopReviews() {
    const count_entries = 10;
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if (reviews !== null)
            return;

        fetch('http://localhost:3000/getReviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count: count_entries })
        })
        .then(response => response.json())
        .then(reviewData => {
            const result = reviewData.map(review => (
                {
                    id: review.id,
                    name: review.name,
                    thumbnail: review.thumbnail ? URL.createObjectURL(new Blob( [new Uint8Array(review.thumbnail.data)], { type: 'image/jpeg' })) : "https://via.placeholder.com/150",
                    rating: review.rating,
                    description: review.description,
                }
            ));

            setReviews(result);
        })
        .catch(error => {
            console.error(error);
        });
    })

    return ( (reviews === null) ?
            <div className="flex flex-col items-center text-center justify-evenly w-full h-auto bg-blue-100">
                <h1 className='font-bold text-3xl my-12 text-center w-full bg-blue-100'>Loading...</h1> :
            </div>
        :
            <div className="flex flex-col items-center text-center justify-evenly w-full h-auto bg-blue-100">
                <LandingPageHeading text="What others say about us:" className="mt-8"/>
                <ReviewsGrid reviews={reviews} cols={Math.min(5, reviews.length)} />
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