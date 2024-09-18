import { Seller } from "./seller";
import { Pictures } from "./pictures";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    thumbnail: "string";
    seller: Seller;
    
    condition: string;
    warranty: string;
    initial_quantity: number;
    permalink: string
    pictures: Pictures[];
}