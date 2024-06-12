import { useNavigate } from 'react-router-dom'
import { clearUserDetails } from '../src/utils.js'

function SignOutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/logout', {
            method: 'PUT',
            credentials: 'include'
        })
        .then(response => {
            if ( response.status === 200 )
                clearUserDetails();

            navigate('/')
        })
        .catch(error => {
            console.error(error);
        });
    }, [navigate]);

    return (
        <div className="h-screen w-screen flex items-center justify-center text-center">
            <h1 className="text-3xl font-bold">Logging out...</h1>
        </div>
    )
}

export default SignOutPage;
