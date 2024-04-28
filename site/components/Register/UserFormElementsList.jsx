import PropTypes from 'prop-types';
import FormElementsList from './FormElementsList';
import UserRequiredDetails from './Data/UserRequiredDetails.js';

function UserFormElementsList({setAccountType, formSubmitHandler}) {
    return (
        <FormElementsList
            requiredList={UserRequiredDetails}
            setAccountType={setAccountType}
            formSubmitHandler={formSubmitHandler}
        />
    )
}
UserFormElementsList.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
};

export default UserFormElementsList;