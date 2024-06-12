import PropTypes from 'prop-types';
import FormElement from './FormElement';
import FormButton from './FormButton';

function FormElementsList({requiredList, setAccountType, formSubmitHandler}) {
    const requiredListInputs = requiredList.map(
        (element, idx) => {
            const upperCaseElement = element.name.split(' ').map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ');
            
            return ( 
                <FormElement
                    key={idx}
                    elementName={upperCaseElement}
                    inputType={element.type}
                    isRequired={element.required} />
            );
        }
    );

    return (
        <form onSubmit={formSubmitHandler} id="registerationForm" className="flex flex-col items-center">
            {requiredListInputs}
            <div className='flex flex-col items-center justify-start'>
                <h1 className='mt-8 px-4 text-2xl font-bold'>Create Account</h1>
                <div className='flex flex-row justify-around'>
                    <FormButton clickHandler={() => setAccountType('Customer')} text='Customer' />
                    <FormButton clickHandler={() => setAccountType('ServiceCenter')} text='Service Center' />
                </div>
            </div>
        </form>
    )
}
FormElementsList.propTypes = {
    requiredList: PropTypes.array.isRequired,
    setAccountType: PropTypes.func.isRequired,
    formSubmitHandler: PropTypes.func.isRequired,
};

export default FormElementsList;