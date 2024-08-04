import axios from 'axios';

const API_URL = 'http://localhost:8000';

axios.defaults.withCredentials = true;

export const register = async (email, password, firstName, lastName) => {
    return axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
    });
};

export const registerSeller = async (email, password, firstName, lastName, passport) => {
    return await axios.post('/registration_seller', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        passport: passport
    });
};


export const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);


    return  axios.post('http://localhost:8000/auth/jwt/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }, {withCredentials: true});
};

export const getProfile = async () => {
    return axios.get(`${API_URL}/profile`);
};

export const logout = async () => {
    return axios.post(`${API_URL}/auth/jwt/logout`);
};

export const getAllProducts = async () => {
    return axios.get(`${API_URL}/products`);
};

export const getProductById = async (id) => {
    return axios.get(`${API_URL}/product/${id}`);
};

export const buyProductById = async (id) => {
    return axios.post(`${API_URL}/buy_product?id_product=${id}`);
};

export const getPurchases = async () => {
    return axios.get(`${API_URL}/get_purchases`);
};

export const getReview = async (id) => {
    return axios.get(`${API_URL}/get_review/${id}`);
};