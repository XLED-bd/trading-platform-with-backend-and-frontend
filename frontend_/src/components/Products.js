import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

import '../App.css';

const Profile = () => {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchProducts();
    }, [navigate]);

    return (
        <div>
            <h1>Товары</h1>
            {products && (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product[0]} className="product-item">
                            <h2>{product[4]}</h2>
                            <p>{product[3]}</p>
                            <p>{product[5]}</p>
                            <Link to={`/products/${product[0]}`}>Подробнее</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
