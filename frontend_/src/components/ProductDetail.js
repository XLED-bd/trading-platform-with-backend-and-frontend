import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, buyProductById, getReview } from '../api/auth';

import '../App.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReview] = useState(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('error', error);
            }
        };

        const fetchReview = async () => {
            try {
                const response = await getReview(id);
                setReview(response.data);
            } catch (error) {
                console.error('error', error);
            }
        };

        fetchProduct();
        fetchReview();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const p = await buyProductById(product.id)
            alert("Ваш товар: " + p.data.product
            );
        } catch (error) {
            console.error('error', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
            <form onSubmit={handleSubmit}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Стоимость: {product.price}</p>
                <button type="submit">Купить</button>
            </form>
            </div>
            <div>
            {reviews && (
                
                <div className="review-list">
                    <p>Отзывы:</p>
                    {reviews.map((review) => (
                        <div key={review[0]} className="review-item">
                            <h2>{review[4]}</h2>
                            <p>{review[2]} {review[3]}</p>
                            <p>{review[5]}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
        
    );
};

export default ProductDetail;
