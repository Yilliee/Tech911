import PlusIcon_Light from './assets/plusIcon_LightOnDark.svg'
import PropTypes from 'prop-types';

function ListingElement({title, thumbnail, price}) {
    return (
        <div className="m-10 w-56 border-grey-200 border-2 rounded-2xl">
            <img src={thumbnail} className="block border-b-2 order-black rounded-t-2xl w-56 h-48" />
            <div className="p-2 flex flex-row items-end text-left justify-evenly">
                <div className="flex flex-col justify-between">
                    <h1 className="font-bold text-base block">{title}</h1>
                    <h1>$ {price}</h1>
                </div>
                    <img
                        src={PlusIcon_Light}
                        className="w-8 rounded-lg"
                    />
            </div>
        </div>
    )
}

ListingElement.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired, // Actually a picture
    price: PropTypes.string.isRequired,
};

export default ListingElement;
