import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            authenticate(token)
                .then(() => {
                    navigate('/dashboard', { replace: true });
                })
                .catch(() => {
                    navigate('/?error=auth_failed');
                });
        } else {
            navigate('/?error=no_token');
        }
    }, [searchParams, navigate, authenticate]);

    return <div>Processing login...</div>;
};

export default OAuth2RedirectHandler;
