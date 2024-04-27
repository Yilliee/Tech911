import PropTypes from 'prop-types';

const PriceSlider = ({currPrice, setCurrPrice, maxPrice}) => {
    function sliderChange(e) {
        setCurrPrice(parseFloat(e.target.value));
    }

    return (
        <label className='flex flex-row items-center justify-center w-full text-center'>
            <p className='w-16'>$ 0</p>
                <input
                    className="w-32 mx-2"
                    type="range"
                    min="0"
                    max={maxPrice}
                    defaultValue={currPrice}
                    onChange={sliderChange}
                />
            <p className='w-16'>$ {currPrice}</p>
        </label>
    );
}
PriceSlider.propTypes = {
    currPrice: PropTypes.number.isRequired,
    setCurrPrice: PropTypes.func.isRequired,
    maxPrice: PropTypes.number.isRequired,
};

function PriceFilter({currPrice, setCurrPrice, maxPrice}) {
    return (
        <div className="border-t-2 py-2">
            <h1 className="text-xl font-bold">Price:</h1>
            <PriceSlider
                currPrice={currPrice}
                setCurrPrice={setCurrPrice}
                maxPrice={maxPrice}
            />
        </div>
    )
}
PriceFilter.propTypes = {
    currPrice: PropTypes.number.isRequired,
    setCurrPrice: PropTypes.func.isRequired,
    maxPrice: PropTypes.number.isRequired,
};

export default PriceFilter;