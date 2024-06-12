import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { getAccountType } from '../../src/utils';

const CreateNewListing = () => {
    const navigate = useNavigate();

    if ( getAccountType() !== 'Service Center' ) {
        navigate('/')
    }

    const [thumbnail, setThumbnail] = useState(null);
    const [additionalPictures, setAdditionalPictures] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [serviceTypeList, setServiceTypeList] = useState('');
    const [deviceTypeList, setDeviceTypeList] = useState('');

    const [selectedServiceType, setSelectedServiceType] = useState(null);
    const [selectedDeviceType, setSelectedDeviceType] = useState(null);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/getServiceTypes', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setServiceTypeList(data.service_type_list);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);


    useEffect(() => {
        fetch('http://localhost:3000/getDeviceTypes', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setDeviceTypeList(data.device_type_list);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    if (serviceTypeList === '' || deviceTypeList === '') {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-center">
                <h1 className="text-3xl font-bold">Loading...</h1>
            </div>
        );
    }

    function uploadThumbnail() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setThumbnail(imageUrl);
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    }

    function addAdditionalPicture() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setAdditionalPictures([...additionalPictures, imageUrl]);
            };
            reader.readAsDataURL(file);
        };
        fileInput.click();
    }

    function removeAdditionalPicture(index) {
        const newPictures = additionalPictures.filter((_, i) => i !== index);
        setAdditionalPictures(newPictures);
    }

    function sendDataToServer(event) {
        event.preventDefault();
        if ( !thumbnail || !title || !description || !price || !selectedServiceType || !selectedDeviceType ) {
            alert('Please fill all the fields');
            return;
        }

        console.log(thumbnail)
        fetch('http://localhost:3000/createListing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                title,
                description,
                price,
                serviceTypeId: selectedServiceType,
                deviceTypeId: selectedDeviceType,
                isPremium,
                thumbnail,
                additionalPictures,
            }),
        })
        .then(response => response.json().then(data => ({ success: response.ok, ...data })))
        .then(data => {
            if (data.success) {
                alert('Listing created successfully');
                navigate('/dashboard');
            } else {
                alert('Failed to create listing');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div className="flex flex-col h-screen w-screen">
            <Navbar showAccountButtons={true} showSearchBar={true} />
            <div className=" flex flex-col m-4">
                <form onSubmit={sendDataToServer} className="flex flex-col px-12 py-6 items-left text-center bg-gray-200 rounded-3xl">
                    <h1 className="font-bold text-3xl mt-8">Create New Listing</h1>
                    <div className="flex flex-row items-center mt-8">
                        <h2 className="font-bold text-xl mr-20">Thumbnail Picture:</h2>
                        <div className="flex flex-col ml-2">
                            {thumbnail && (
                                <img
                                    src={thumbnail}
                                    alt="Thumbnail Preview"
                                    className="my-4 h-40 aspect-16/10 object-cover rounded-3xl"
                                />
                            )}
                            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl" onClick={uploadThumbnail}>
                                Upload Thumbnail
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h2 className="font-bold text-xl mr-20">Additional Pictures:</h2>
                        <div className="flex flex-col items-center">
                            <div className="grid grid-cols-3">
                                {additionalPictures.map((picture, index) => (
                                    <div key={index} className="flex flex-col items-center mr-4">
                                        <img
                                            src={picture}
                                            alt={`Additional Picture ${index + 1}`}
                                            className="my-4 h-40 aspect-16/10 object-cover rounded-3xl"
                                        />
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl"
                                            onClick={() => removeAdditionalPicture(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                                {additionalPictures.length < 10 && (
                                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-4 w-56" onClick={addAdditionalPicture}>
                                    Add Picture
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-48">Title:</h1>
                        <input
                            type="text"
                            className="border-2 border-black rounded-3xl ml-8 w-96 h-8 px-4 py-2"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-32">Description:</h1>
                        <textarea
                            className="border-2 border-black rounded-3xl ml-6 w-96 h-32 resize-none px-4 py-2"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-48">Price:</h1>
                        <input
                            type="number"
                            className="border-2 border-black rounded-3xl ml-6 w-96 h-8 px-4 py-2"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-32">Service Type:</h1>
                        <select
                            className="border-2 border-black rounded-3xl ml-4 w-96 h-12 px-4 py-2"
                            defaultValue={selectedServiceType}
                            onChange={(event) => setSelectedServiceType(event.target.value)}
                            required
                        >
                            <option value="">Select Service Type</option>
                            {serviceTypeList.map((serviceType) => (
                                <option key={serviceType.id} value={serviceType.id}>
                                    {serviceType.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-32">Device Type:</h1>
                        <select
                            className="border-2 border-black rounded-3xl ml-6 w-96 h-12 px-4 py-2"
                            defaultValue={selectedServiceType}
                            onChange={(event) => setSelectedDeviceType(event.target.value)}
                            required
                        >
                            <option value="">Select Device Type</option>
                            {deviceTypeList.map((serviceType) => (
                                <option key={serviceType.id} value={serviceType.id}>
                                    {serviceType.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row items-center mt-8">
                        <h1 className="font-bold text-xl mr-32">Premium Listing:</h1>
                        <input
                            type="checkbox"
                            className="ml-6 w-6 h-6"
                            checked={isPremium}
                            onChange={(event) => setIsPremium(event.target.checked)}
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-8 w-56" type="submit">
                        Create Listing
                    </button>
                </form>
            </div>
        </div>
    );
};


export default CreateNewListing;