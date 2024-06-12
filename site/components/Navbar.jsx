import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPictureURLFromBase64, getUserDetails, clearUserDetails, getUsername } from '../src/utils'
import Logo from '../src/assets/react.svg'
import SearchIcon from './assets/search_icon.jpg'
import defaultProfilePic from './assets/default_profile_pic.png'
import { useEffect, useState } from 'react'

function Navbar({ showSearchBar, showAccountButtons, onTextChange, initialSearchText}) {
    const [authStatus, setAuthStatus] = useState(false);
    
    useEffect(() => {
        if ( getUsername() === null )
            return;
    
    fetch('http://localhost:3000/authenticate', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if ( response.status === 200 )
                setAuthStatus(true);
            else { 
                clearUserDetails();
                setAuthStatus(false);
            }
        })
        .catch(error => {
            console.log('err')
            console.error(error);
        });
    }, [authStatus]);
    
    const { username, displayName, accountType, profilePicBase64 } = getUserDetails();
    const profilepicUrl = (profilePicBase64 && profilePicBase64 !== '')
                            ? getPictureURLFromBase64(profilePicBase64) : defaultProfilePic;
                            
    const navigate = useNavigate();

    return (
        <nav className="w-full flex items-center justify-between bg-black text-white p-4 font-bold">
            <div className="flex items-center justify-start w-1/3">
                <Link to="/">
                    <div className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-8 w-8" />
                        <h1 className="ml-2 text-xl">Tech - 911</h1>
                    </div>
                </Link>
                { showAccountButtons &&
                    <div className="flex items-center ml-4">
                        {username && <Link to='/dashboard' className='mr-4'>Dashboard</Link>}
                        <Link to='/search' className='mr-4'>View All Listings</Link>
                        {accountType === 'Service Center' ?
                          <Link to='/createListing' className='mr-4'>Create New Listing</Link>  
                        : <Link to='/troubleshooting' className='mr-4'>Troubleshooting</Link>
                        }
                    </div>
                }
            </div>

            { showSearchBar &&
                <form
                    onSubmit={ (e) => {
                        e.preventDefault();
                        navigate('/search',
                            { state: 
                                { searchValue: document.getElementById('searchBarNavbar').value} 
                            }
                        )
                    }}
                    className="flex items-center text-black"
                >
                    <input
                        type="search" id='searchBarNavbar'
                        className="rounded-l-3xl pl-4 py-1 h-10 w-96 border-black border-2 border-r-0"
                        placeholder="What service do you need?"
                        defaultValue={initialSearchText}
                        onChange={onTextChange}
                    />
                    <img
                        className="h-10 rounded-r-3xl border-black border-2 border-l-0"
                        src={SearchIcon}
                    />
                </form>
            }
            { authStatus ? 
                <div className="flex flex-row items-center justify-end w-1/3">
                    <p className="m-2 w-40 truncate text-right">{displayName}</p>
                    <Link to="/profile">
                        <img 
                            src={profilepicUrl}
                            className="mx-2 rounded-full w-12 h-12" />
                    </Link>
                </div>
             :
                <div className="flex flex-row items-center justify-end w-1/3">
                    <Link to="/register">
                        <button className="bg-white text-black rounded-lg px-4 py-2 mx-2">Register</button>
                    </Link>
                    <Link to="/signin">
                        <button className="bg-white text-black rounded-lg px-4 py-2 mx-2">Sign In</button>
                    </Link>
                </div>
            }
        </nav>
    );
}
Navbar.propTypes = {
    showSearchBar: PropTypes.bool.isRequired,
    showAccountButtons: PropTypes.bool.isRequired,
    onTextChange: PropTypes.func,
    initialSearchText: PropTypes.string
}
Navbar.defaultProps = {
    onTextChange: () => {},
    initialSearchText: '',
}

export default Navbar;
