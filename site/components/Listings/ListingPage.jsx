import ListingPictureGrid from './ListingPictureGrid'
import ListingPurchaseForm from './ListingPurchaseForm'
import ListingReviewsGrid from './ListingReviewsGrid'

import NavBar from '../Navbar'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function ListingPage() {
    const location = useLocation();

    const listingID = location.state?.listingID;
    const [listingDetail, setListingDetail] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        if ( ! listingID || listingDetail !== null )
            return;

        fetch('http://localhost:3000/getListingDetails', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listingID })
        })
        .then(response => response.json())
        .then(data => {
            setListingDetail(data);
            document.title = data.title;
        })
        .catch(error => {
            // Handle any errors here
            console.error(error);
        });
    }, [listingID, listingDetail]);

    useEffect(() => {
        if ( ! listingID || reviews !== null )
            return;

        fetch('http://localhost:3000/getReviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count: 10, listing_id: listingID })
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
    }, [listingID, reviews]);

    if ( ! listingID ) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-red-700">Error: No listing ID provided</h1>
            </div>
        );
    }
    if ( ! listingDetail || ! reviews ) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-black">Loading...</h1>
            </div>
        );
    }

    const pictures = listingDetail.pictures.map((picture) => ({
        'id': picture.picture_id,
        'picture': URL.createObjectURL(new Blob( [new Uint8Array(picture.picture.data)], { type: 'image/jpeg' })),
    }));
    const thumbnailIndex = pictures.findIndex((picture) => picture.id === listingDetail.thumbnail_id);

    return (
        <div className="w-full h-full">
            <NavBar showAccountButtons={false} showSearchBar={true} />
            <div className='flex flex-col items-start justify-between p-8'>
                <div className="flex flex-row items-center justify-between">
                    <ListingPictureGrid imagesArr={pictures} thubmnailIndex={thumbnailIndex}/>
                    <ListingPurchaseForm listing={listingDetail}/>
                </div>
                {reviews.length > 0 && <ListingReviewsGrid reviews={reviews} />}
            </div>
        </div>
    );
}

export default ListingPage;
