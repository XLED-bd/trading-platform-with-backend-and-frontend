import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import RegistrationSeller from './components/RegistrationSeller';
import AddProduct from './components/NewProduct';

import './App.css';

const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/register_seller">Стать продавцом</Link>
                    </li>
                    <li>
                        <Link to="/new_product">Предоставить новые товары</Link>
                    </li>
                    <li>
                        <Link to="/register">Зарегистрироваться</Link>
                    </li>
                    <li>
                        <Link to="/login">Вход</Link>
                    </li>
                    <li>
                        <Link to="/profile">Профиль</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route path="/register_seller" element={<RegistrationSeller />} />
                <Route path="/new_product" element={<AddProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
