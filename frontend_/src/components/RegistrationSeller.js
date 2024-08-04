import React, { useState } from 'react';
import axios from 'axios';

const RegistrationSeller = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passport, setPassport] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8000/registration_seller?first_name=${firstName}&last_name=${lastName}&email=${email}&password=${password}&passport=${passport}`);

            alert("Регистрация прошла успешно!");
        } catch (error) {
            alert("Некорретные данные!");
        }
    };

    return (
        <div className="registration-form">
            <h1>Регистрация Продавца</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Фамилия:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Паспорт:</label>
                    <input type="text" value={passport} onChange={(e) => setPassport(e.target.value)} required />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default RegistrationSeller;