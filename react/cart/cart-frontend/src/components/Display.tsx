import React from 'react';
import ProductCard from "./ProductCard.js";

interface DisplayProps {
   products: {
       id: number, name: string, description: string, price: number }[];
}
const Display : React.FC<DisplayProps> = ({products}) => {
    return (
        <div>
            {products.length > 0 ? products.map(product =>
                <ProductCard key={product.id} title={product.name} price={product.price} description={product.description}/>)
                : <p>No products found</p>}
        </div>
    );
};

export default Display;