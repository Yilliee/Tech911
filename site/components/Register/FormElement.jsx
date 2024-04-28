import PropTypes from 'prop-types';

function FormElement({elementName, inputType, isRequired}) {
    const lowerCaseElement = elementName.toLowerCase();
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-start w-72">
                <p className='pl-4 py-2 font-semibold text-xl'>
                    {elementName}
                </p>
                {isRequired && <p className='pl-2 text-red-600'>*</p>}
            </div>
            <input
                className="border-2 w-72 rounded-3xl h-12 px-4 text-base"
                type={inputType}
                id={lowerCaseElement}
                required={isRequired}
                placeholder={`Enter ${lowerCaseElement}`}
                />
        </div>
    )
}
FormElement.propTypes = {
    elementName: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
};

export default FormElement;