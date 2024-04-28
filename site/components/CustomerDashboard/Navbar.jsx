import PropTypes from 'prop-types';
import SearchIcon from './assets/search_icon.jpg'
import Logo from '../../src/assets/react.svg'

function CustomerNavbar({username}) {
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
                />
                <img
                    className="h-10 rounded-r-3xl border-black border-2 border-l-0"
                    src={SearchIcon}
                />
            </div>
            <div className="flex flex-row items-center">
                <p className="m-2 w-28 truncate text-right">{username}</p>
                <img 
                    src="https://via.placeholder.com/50"
                    className="mx-2 rounded-full w-12 h-12" />
            </div>
        </nav>
    );
}
CustomerNavbar.propTypes = {
};

export default CustomerNavbar;
