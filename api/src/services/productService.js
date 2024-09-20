import axios from 'axios';

export const searchByTitle = async (title) => {
    const response = await axios.get(`${process.env.ENDPOINT_ML}sites/MLB/search?q=${encodeURIComponent(title)}`);
    return response.data;
};

export const searchById = async (id) => {
    const response = await axios.get(`${process.env.ENDPOINT_ML}items/${encodeURIComponent(id)}`);
    return response.data;
};

export default {
    searchProductByTitle: searchByTitle,
    searchProductById: searchById,
};
