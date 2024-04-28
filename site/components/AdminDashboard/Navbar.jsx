import PropTypes from 'prop-types';
import Logo from '../../src/assets/react.svg'

function AdminNavbar({username}) {
    return (
        <nav className="w-full flex items-center justify-between bg-black text-white p-4 font-bold">
            <div className="flex items-center" onClick={() => {console.log("Navigate to Landing Page")}}>
                <img src={Logo} alt="Logo" className="h-8 w-8" />
                <h1 className="ml-2 text-xl">Tech - 911</h1>
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
AdminNavbar.propTypes = {
    username: PropTypes.string.isRequired,
};

export default AdminNavbar;
