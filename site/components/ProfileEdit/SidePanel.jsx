import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignOutIcon from './assets/signout_icon.png';
import ProfilePic from './assets/profile_pic.png';
import { clearUserDetails, getPictureURLFromBase64, getProfilePicBase64, getUserDetails, getUsername } from '../../src/utils';

function SidePanel({setPageType, buttonNames, pageType}) {
    const navigate = useNavigate();
    
    const username = getUsername();
    const profile_pic = getProfilePicBase64() ? getPictureURLFromBase64(getProfilePicBase64()) : ProfilePic;
    
    const listEntryClassName = "flex flex-row w-full text-center items-center mt-4 py-4 pr-4 rounded-3xl";
    const unselectedButtonClassName = "hover:bg-white hover:shadown-lg"
    const signOutButton = {
        'title': "Sign out",
        'icon': SignOutIcon,
    }


    return (
        <div className="flex flex-col h-full">
           <div className="flex flex-col justify-between bg-gray-200 rounded-2xl h-full py-4 px-2 my-12 mx-6 w-72">
                <div className="flex flex-col text-center items-center">
                    <div className="flex flex-row w-full text-center items-center py-4 border-b-2 border-black">
                        <img src={profile_pic} className="mr-4 ml-6 w-10 h-10 rounded-full" />
                        <label className="flex-grow font-bold text-xl">{username}</label>
                    </div>

                    {buttonNames.map(({title, icon}, idx) => (
                        <button key={idx}
                            className={`${listEntryClassName} ${pageType === title ? 'bg-white' : unselectedButtonClassName} ${title === "General" && 'pl-2'}`}
                            onClick={() => setPageType(title)}
                        >
                            <img src={icon} className="mx-4 h-8 rounded-md" />
                            <span className="flex-grow font-bold text-xl">{title}</span>
                        </button>
                    ))}
                </div>
                <Link to="/signout">
                    <button className={`${listEntryClassName} px-2 ${unselectedButtonClassName}`} >
                        <img src={signOutButton.icon} className="mr-4 ml-4 h-10 rounded-md" />
                        <span className="flex-grow font-bold text-xl">{signOutButton.title}</span>
                    </button>
                </Link>
           </div>
        </div>
    );
}

SidePanel.propTypes = {
    setPageType: PropTypes.func.isRequired,
    buttonNames: PropTypes.array.isRequired,
    pageType: PropTypes.string.isRequired,
}


export default SidePanel;