import PropTypes from 'prop-types';

function FormButton({clickHandler, text}) {
    return (
        <button
            className='mt-4 mx-2 px-4 min-w-24 min-h-12 bg-blue-500 text-white font-bold rounded-3xl'
            type="submit" onClick={clickHandler}
        >
            {text}
        </button>
        
    );
}
FormButton.propTypes = {
    clickHandler: PropTypes.func,
    text: PropTypes.string.isRequired,
};
FormButton.defaultProps = {
    clickHandler: null,
};

export default FormButton;