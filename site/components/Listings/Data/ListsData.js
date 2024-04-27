import androidBattery from './androidBattery.jpeg'
import androidCamera from './androidCamera.jpeg'
import androidChargingPort from './androidChargingPort.jpeg'
import androidScreen from './androidScreen.jpeg'
import androidSpeaker from './androidSpeaker.jpeg'
import iphoneBattery from './iphoneBattery.png'

import laptopBattery from './laptopBattery.jpeg'
import laptopScreen from './laptopScreen.jpeg'
import laptopFan from './laptopFan.jpeg'
import laptopRam from './laptopRam.jpeg'

const phones = [
    'Samsung Galaxy S21',
    'Samsung Galaxy S20',
    'Oneplus 8',
    'Google Pixel 7',
    'Xiaomi Mi 12',
    'Huawei P40 Litw', 
    'LG ThinQ'
];

const laptops = [
    'Dell XPS 13', 
    'HP Specte 14',
    'Lenovo Legion 5',
    'Asus Nitro 7',
    'Asus ROG Zephyrus',
    'Microsoft Surface Pro',
];

const ListingElements = []

let id = 1;
phones.map((phoneModel) => {
    ListingElements.push({
        id: id,
        thumbnail: androidBattery,
        title: `${phoneModel} Battery Replacement`,
        price: parseFloat((Math.random() * 50).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: false,
    })
    ListingElements.push({
        id: id + 1,
        thumbnail: androidScreen,
        title: `${phoneModel} Screen Replacement`,
        price: parseFloat((Math.random() * 300).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: (phoneModel === 'Samsung Galaxy S20'),
    })
    ListingElements.push({
        id: id + 2,
        thumbnail: androidChargingPort,
        title: `${phoneModel} Charging Port Replacement`,
        price: parseFloat((Math.random() * 25).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: false,
    })
    ListingElements.push({
        id: id + 3,
        thumbnail: androidCamera,
        title: `${phoneModel} Camera Replacement`,
        price: parseFloat((Math.random() * 15).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: false,
    })
    ListingElements.push({
        id: id + 4,
        thumbnail: androidSpeaker,
        title: `${phoneModel} Speaker Replacement`,
        price: parseFloat((Math.random() * 50).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: false,
    })

    id += 5;
});

laptops.map((laptopModel) => {
    ListingElements.push({
        id: id,
        thumbnail: laptopBattery,
        title: `${laptopModel} Battery Replacement`,
        price: parseFloat((Math.random() * 50).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Laptop',
        isFeatured: (laptopModel === 'Dell XPS 13'),
    })
    ListingElements.push({
        id: id + 1,
        thumbnail: laptopScreen,
        title: `${laptopModel} Screen Replacement`,
        price: parseFloat((Math.random() * 300).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Laptop',
        isFeatured: false,
    })
    ListingElements.push({
        id: id + 2,
        thumbnail: laptopFan,
        title: `${laptopModel} Fan Replacement`,
        price: parseFloat((Math.random() * 25).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Laptop',
        isFeatured: false,
    })
    ListingElements.push({
        id: id + 3,
        thumbnail: laptopRam,
        title: `${laptopModel} Ram Replacement`,
        price: parseFloat((Math.random() * 15).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Laptop',
        isFeatured: false,
    })

    id += 4;
});

ListingElements.push(
    {
        id: id,
        thumbnail: iphoneBattery,
        title: 'Iphone Battery Replacement',
        price: parseFloat((Math.random() * 50).toFixed(2)),
        serviceType: 'Replacement',
        DeviceType: 'Smartphone',
        isFeatured: true,
    }
);
id += 1;

export default ListingElements;