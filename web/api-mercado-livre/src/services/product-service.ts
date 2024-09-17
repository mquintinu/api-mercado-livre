import axios from 'axios';
import { Product } from "../models/product";

export default class ProductService {

    async searchProducts(title: string): Promise<Product[]> {
        const response = await axios.get<{ results: Product[] }>(`http://localhost:3333/search`, { params: { title } });
        
        return response.data.results;
    }
}