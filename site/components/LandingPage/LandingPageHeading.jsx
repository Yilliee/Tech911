import PropTypes from 'prop-types';

function LandingPageHeading({text, className}) {
    return (
        <h1 className={`font-bold text-4xl ${className}`}>{text}</h1>
    );
}

LandingPageHeading.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default LandingPageHeading;