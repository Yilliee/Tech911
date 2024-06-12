import PropTypes from 'prop-types';
import TroubleshootingData from "./Data/TroubleshootingData.js";
import Navbar from './Navbar';

function TroubleshootingPage() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Navbar showAccountButtons={true} showSearchBar={false} />
            <h1 className="text-3xl font-bold mt-8">Troubleshooting</h1>
            <div className="w-3/4">
                {TroubleshootingData.map((data, index) => <TroubleshootingCard key={index} {...data} />)}
            </div>
        </div>
    );

}

function TroubleshootingCard({title, description, additionalSteps}) {
    return (
        <div className="bg-red-200 p-6 rounded-lg shadow-md my-8 hover:shadow-2xl">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
            <ul className="list-disc list-inside mt-4">
                {additionalSteps.map((step, index) => <li key={index} className="text-gray-600">{step}</li>)}
            </ul>
        </div>
    );
}
TroubleshootingCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    additionalSteps: PropTypes.array.isRequired,
}

export default TroubleshootingPage;