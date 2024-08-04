import React, { useEffect, useState } from 'react';
import { getProfile, logout, getPurchases } from '../api/auth';
import { useNavigate } from 'react-router-dom';

import '../App.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [purchases, setPurchases] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error('Profile error', error);
                navigate('/login');
            }
        };

        const fetchPurchases = async () => {
            try {
                const response = await getPurchases();
                setPurchases(response.data);
            } catch (error) {
                console.error('Profile error', error);
                navigate('/login');
            }
        };

        fetchProfile();
        fetchPurchases();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='profile'>
                <h1>Профиль</h1>
                <p>Электронная почта: {profile.email}</p>
                <p>Имя: {profile.first_name}</p>
                <p>Фамилия: {profile.last_name}</p>
                <p>Дата регистрации: {profile.date_registration}</p>
                <button onClick={handleLogout}>Выход</button>
            </div>
            <div>
            <p>Ваши покупки:</p>
            {purchases && (
                <div className="product-list">
                    {purchases.map((purchase) => (
                        <div key={purchase[0]} className="product-item">
                            <h2>{purchase[4]}</h2>
                            <p>{purchase[2]}</p>
                            <p>{purchase[3]}</p>
                            <p>{purchase[5]}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Profile;
