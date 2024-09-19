import axios from 'axios';
import { Product } from "../models/product";

const API_NODE_URL = "http://localhost:3333";

export default class ProductService {

    async searchProducts(title: string): Promise<Product[]> {
        const response = await axios.get<{ results: Product[] }>(`${API_NODE_URL}/searchByTitle`, { params: { title } });

        return response.data.results;
    }

    async findById(id: string): Promise<Product> {
        const response = await axios.get<Product>(`${API_NODE_URL}/findById/${id}`);

        return response.data;
    }
}