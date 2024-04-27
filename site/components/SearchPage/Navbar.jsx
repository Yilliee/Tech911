import PropTypes from 'prop-types';
import SearchIcon from './assets/search_icon.jpg'
import Logo from '../../src/assets/react.svg'

function SearchPageNavbar({onTextChange}) {
    return (
        <nav className="w-full flex items-center justify-between bg-black text-white p-4 font-bold">
            <div className="flex items-center" onClick={() => {console.log("Navigate to Landing Page")}}>
                <img src={Logo} alt="Logo" className="h-8 w-8" />
                <h1 className="ml-2 text-xl">Tech - 911</h1>
            </div>
            <div className="flex items-center text-black">
                <input
                    type="search"
                    className="rounded-l-3xl pl-4 py-1 h-10 w-96 border-black border-2 border-r-0"
                    placeholder="What service do you need?"
                    onChange={(e) => onTextChange(e.target.value)}
                />
                <img
                    className="h-10 rounded-r-3xl border-black border-2 border-l-0"
                    src={SearchIcon}
                />
            </div>
            <button className="bg-white text-black rounded-3xl px-4 py-2">Sign In</button>
        </nav>
    );
}
SearchPageNavbar.propTypes = {
    onTextChange: PropTypes.func.isRequired,
};

export default SearchPageNavbar;
