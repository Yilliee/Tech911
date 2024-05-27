import CustomerImage from './assets/Customer.jpeg';
import ServiceCenterImage from './assets/LaptopRepair.jpg';
import AdminImage from './assets/Hacker.jpeg';

import PropTypes from 'prop-types';

function LoginBgImage({accountType}) {
    const imageDetails = {
        'Customer': {
            'image': CustomerImage,
            'alt': 'Login Background for Customer',
        },
        'Service Center': {
            'image': ServiceCenterImage,
            'alt': 'Login Background for Service Center',
        },
        'Admin': {
            'image': AdminImage,
            'alt': 'Login Background for Admin',
        },
    }

    return (
        <div className="inline-block w-1/2">
            <img
                src={imageDetails[accountType].image}
                alt={imageDetails[accountType].alt}
                id="login_image"
                className="object-cover w-full h-full"
            />
        </div>
    )
}
LoginBgImage.propTypes = {
    accountType: PropTypes.string.isRequired,
};

export default LoginBgImage
