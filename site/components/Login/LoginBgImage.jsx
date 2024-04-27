import CustomerImage from './assets/Customer.jpeg';
import ServiceCenterImage from './assets/LaptopRepair.jpg';
import PropTypes from 'prop-types';

function LoginBgImage({accountType}) {
    return (
        <div className="inline-block w-1/2">
            {(accountType === 'customer') ?
                <img src={CustomerImage} alt="Customer" className="object-cover w-full h-full" />
                : <img src={ServiceCenterImage} alt="Service Center" className="object-cover w-full h-full" />
            }
        </div>
    )
}
LoginBgImage.propTypes = {
    accountType: PropTypes.string.isRequired,
};

export default LoginBgImage