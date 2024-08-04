import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState('');
    const [limit, setLimit] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:8000/add_product?email=${email}&hashed_password=${password}&category=${category}&cost=${cost}&name=${name}&descption=${description}&product=${product}&limit=${limit}`);

            alert("Продукт успешно добавлен!");
        } catch (error) {
            alert("Некорректные данные!");
        }
    };

    return (
        <div className="add-product-form">
            <h1>Добавить товар</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Категория:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div>
                    <label>Стоимость:</label>
                    <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
                </div>
                <div>
                    <label>Название:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Описание:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Продукт:</label>
                    <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} required />
                </div>
                <div>
                    <label>Лимит:</label>
                    <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} required />
                </div>
                <button type="submit">Добавить Продукт</button>
            </form>
        </div>
    );
};

export default AddProduct;
