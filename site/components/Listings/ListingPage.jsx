import laptopFan from './Data/laptopFan.jpeg'
import laptopRam from './Data/laptopRam.jpeg'
import laptopScreen from './Data/laptopScreen.jpeg'
import reviews from '../Reviews/Data/TopReviewsData.js'

import ListingPictureGrid from './ListingPictureGrid'
import ListingPurchaseForm from './LisitingPurchaseForm'
import ListingReviewsGrid from './ListingReviewsGrid'

import NavBar from '../SearchPage/Navbar'
import ListingReviews from './ListingReviewsGrid'

const data = {
    'title': 'Laptop Fan Replacement',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'options': ['Option 1', 'Option 2', 'Option 3'],
    'price': '$99.99',
    'pictures': [   laptopFan, laptopRam, laptopScreen,
                    laptopFan, laptopRam, laptopScreen,
                    laptopFan, laptopRam, laptopScreen],
}

function ListingPage() {
    const ListingData = data;
    const isLogggedIn = true;

    document.title = ListingData.title;
    return (
        <div className="w-full h-full">
            <NavBar onTextChange={() =>console.log(null)}/>
            <div className="flex flex-row items-center justify-between">
                <ListingPictureGrid imagesArr={ListingData.pictures}/>
                <ListingPurchaseForm Data={ListingData} loggedIn={isLogggedIn}/>
            </div>
            <ListingReviewsGrid reviews={reviews} />
        </div>
    );
}

export default ListingPage;