import { useEffect, useState } from 'react';
import ProfilePic from './assets/profile_pic.png'
import { getPictureURLFromBase64, getProfilePicBase64, getUsername, getDisplayName, getUserDetails, StoreUserDetails, getAccountType } from '../../src/utils';

function MainPanel() {

    const [userData, setUserData] = useState(null);
    const [updatedFlag, setUpdatedFlag] = useState(false);
    const [profilePicBase64, setProfilePicBase64] = useState(null);

    useEffect(() => {
        if ( userData !== null ) return;

        fetch('http://localhost:3000/getUserDetails', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setUserData({
                'username': getUsername(),
                'display_name': getDisplayName(),
                'profile_pic': ((getProfilePicBase64()) ? getPictureURLFromBase64(getProfilePicBase64()) : ProfilePic),
                'address': data.address,
                'phone_no': data.phone_no,
                'bio': data.bio
            });
        })
        .catch(error => {
            console.error(error);
        });
    }, [userData]);

    function uploadPicture() {
        // Create a file input element
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if ( ! file ) return;

            document.getElementById('profile_pic').src = URL.createObjectURL(file);

            const base64Data = new FileReader();
            base64Data.onload = function(e) {
                setProfilePicBase64(e.target.result.substring(e.target.result.indexOf('base64,') + 7));
            };
            base64Data.readAsDataURL(file);

            setUpdatedFlag(true);
        });

        // Trigger the file picker dialog
        input.click();
    }

    function updateData(e) {
        e.preventDefault();

        const data = {
            'display_name': document.getElementById('display_name').value,
            'address': document.getElementById('address').value || null,
            'phone_no': document.getElementById('phone_no').value,
            'bio': document.getElementById('bio').value || null,
        };

        if ( data.phone_no.length < 11 ) {
            console.log('Prefixing the phone_number with 0s...');
            data.phone_no = '0'.repeat(11 - data.phone_no.length) + data.phone_no;
            return;
        }

        const filteredData = Object.keys(data).filter(
            key => data[key] !== userData[key]
        );
        const updatedData = {};
        filteredData.forEach(key => {
            updatedData[key] = data[key];
        });
        if (profilePicBase64) {
            updatedData['profile_pic_base64'] = profilePicBase64;
        }

        if ( Object.keys(updatedData).length === 0 ) {
            alert('No changes made');
            setUpdatedFlag(false);
            return;
        }

        fetch('http://localhost:3000/updateUserDetails', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json().then(
            data => ({
                status: response.status,
                ...data
            })
        ))
        .then(data => {
            if ( data.status === 200 ) {
                let { username, displayName, profilePicBase64 } = getUserDetails();
                if ( 'profile_pic_base64' in updatedData )
                    profilePicBase64 = updatedData.profile_pic_base64;
                if ( 'display_name' in updatedData )
                    displayName = updatedData.display_name;
                StoreUserDetails(username, displayName, getAccountType(), profilePicBase64);
                
                setUpdatedFlag(false);
                setUserData(null);
                setProfilePicBase64(null);

                window.location.reload();
            }

            alert(data.message);
        })
        .catch(error => console.error(error));
    }

    if ( userData === null )
        return (
            <div className="h-full w-full flex items-center justify-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );

    const maxCharsForBio = 500;
    let remaining_characters_bio = maxCharsForBio - (userData.bio ? userData.bio.length : 0);
    
    function bioUpdated() {
        const bio = document.getElementById('bio').value;
        remaining_characters_bio = maxCharsForBio - bio.length;
        document.getElementById('bio_rem_chars').innerText =
            `${remaining_characters_bio} / ${maxCharsForBio}`;

        return true;
    }

    return (
        <div className="flex flex-col h-full w-full mr-6">
           <form onSubmit={updateData} className="flex flex-col justify-between bg-gray-200 rounded-2xl h-full w-full px-10 my-6">
                <h1 className="font-bold text-3xl mt-8">Profile</h1>
                <div className="flex flex-row items-center">
                    <h3 className="font-semibold text-lg w-40">Profile Picture</h3>
                    <img src={userData['profile_pic']} id='profile_pic' className="ml-12 w-52 h-52 rounded-full" />
                    <div className='flex flex-col ml-12'>
                        <button type="button" className="bg-white px-4 py-2 w-64 rounded-3xl hover:shadow-xl" onClick={uploadPicture}>Change Picture</button>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-8">
                    <div className='flex flex-col justify-evenly w-40'>
                        <h3 className="font-semibold text-lg">Username:</h3>
                    </div>
                    <label className="ml-12 w-52 bg-white py-2 px-4 text-center trunc rounded-3xl">{userData.username}</label>
                </div>
                <div className="flex flex-row items-center mt-8">
                    <div className='flex flex-col justify-evenly w-40'>
                        <h3 className="font-semibold text-lg">Display Name:</h3>
                    </div>
                    <input
                        type="text" 
                        className="ml-12 w-52 bg-white py-2 px-4 text-center trunc rounded-3xl"
                        defaultValue={userData.display_name}
                        id="display_name"
                        onChange={() => updatedFlag || setUpdatedFlag(true)}
                        required={true}
                    />
                </div>
                <div className="flex flex-row items-center mt-8">
                    <div className='flex flex-col justify-evenly w-40'>
                        <h3 className="font-semibold text-lg">Address:</h3>
                    </div>
                    <input
                        type="text" 
                        className="ml-12 w-52 bg-white py-2 px-4 text-center trunc rounded-3xl"
                        defaultValue={userData.address}
                        id="address"
                        onChange={() => updatedFlag || setUpdatedFlag(true)} />
                </div>
                <div className="flex flex-row items-center mt-8">
                    <div className='flex flex-col justify-evenly w-40'>
                        <h3 className="font-semibold text-lg">Phone No.:</h3>
                    </div>
                    <input
                        type="tel" 
                        className="ml-12 w-52 bg-white py-2 px-4 text-center trunc rounded-3xl"
                        defaultValue={userData.phone_no}
                        id="phone_no"
                        pattern='[0-9]{11}'
                        maxLength={11}
                        onChange={() => updatedFlag || setUpdatedFlag(true)}
                        required={true}
                    />
                </div>
                <div className="flex flex-row items-center mt-8">
                    <div className='flex flex-col justify-evenly w-40'>
                        <h3 className="font-semibold text-lg">Bio:</h3>
                    </div>
                    <textarea
                        className="ml-12 w-96 h-24 bg-white p-4 rounded-3xl resize-none"
                        maxLength={500}
                        defaultValue={userData.bio}
                        id="bio"
                        onChange={() => bioUpdated() && (updatedFlag || setUpdatedFlag(true))}
                    />
                    <p className="ml-2 text-gray-500" id='bio_rem_chars'>{remaining_characters_bio} / {maxCharsForBio}</p>
                </div>
                <button
                    type="submit"
                    className={`my-8 w-72 h-12 ${updatedFlag ? ' bg-blue-500 hover:bg-blue-700' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded-2xl`}
                    disabled={! updatedFlag}
                >
                        Save Changes
                </button>
            </form>
        </div>
    )
}

export default MainPanel;