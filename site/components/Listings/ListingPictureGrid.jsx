import { useState } from 'react';
import PropTypes from 'prop-types'
import arrowPic from './assets/arrow.png'

function ListingPictureGrid({imagesArr, thubmnailIndex = 0}) {
    // One pic is reserved for thubmnail
    const picturesCount = imagesArr.length;
    const maxPicturesAtOnce = 4;

    const [pictureListIndex, setPictureListIndex] = useState(0);
    const [mainPictureIndex, setMainPictureIndex] = useState(thubmnailIndex);

    function updatePicturesIndex(increment) {
        let newIndex = pictureListIndex + increment;
        if (newIndex < 0) newIndex = picturesCount - 1;

        setPictureListIndex(newIndex % picturesCount);
    }

    return (
        <div className="flex flex-col ml-12 mt-16 w-5/12">
            <img src={imagesArr[mainPictureIndex].picture} className="w-full rounded-3xl aspect-16/10" />
            <div className="w-full mt-4 flex flex-row items-center justify-evenly">
                {picturesCount > maxPicturesAtOnce &&
                    <img
                        src={arrowPic}
                        className="w-16 rounded-full rotate-180"
                        onClick={() => updatePicturesIndex(-1)} />}
                {imagesArr.slice(pictureListIndex, Math.min(pictureListIndex + maxPicturesAtOnce, picturesCount)).map(({id, picture}, index) => (
                    <img key={id} src={picture}
                        className="w-2/12 mx-4 rounded-lg"
                        onClick={() => setMainPictureIndex(pictureListIndex + index)} />
                ))}
                {picturesCount > maxPicturesAtOnce && imagesArr.slice(0, Math.max(0, pictureListIndex + maxPicturesAtOnce - picturesCount)).map(({id, picture}, index) => (
                    <img key={id} src={picture}
                        className="w-2/12 mx-4 rounded-lg"
                        onClick={() => setMainPictureIndex(index)} />
                ))}
                {picturesCount > maxPicturesAtOnce &&
                    <img
                        src={arrowPic}
                        className="w-16 rounded-full"
                        onClick={() => updatePicturesIndex(1)} />}
            </div>
        </div>
    );
}

ListingPictureGrid.propTypes = {
    imagesArr: PropTypes.array.isRequired,
    thubmnailIndex: PropTypes.number,
};

export default ListingPictureGrid;