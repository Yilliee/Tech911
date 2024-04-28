const UserRequiredDetails = [
    {
        name: 'username',
        type: 'text',
        required: true,
    },
    {
        name: 'display name',
        type: 'name',
        required: true,
    },
    {
        name: 'address',
        type: 'text',
        required: false,
    },
    {
        name: 'phone number',
        type: 'tel',
        required: true,
    },
    {
        name: 'email',
        type: 'email',
        required: true,
    },
    {
        name: 'password',
        type: 'password',
        required: true,
    },
];

export default UserRequiredDetails;