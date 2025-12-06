
interface Product {
    title: string;
    description: string;
    price: number;
}

const ProductCard : React.FC<Product> = ({title, description, price}) => {
    return (
        <div className="border border-gray-400 p-1 w-60">
            <div className="bg-sky-200 w-full h-60"></div>
            <h3 className="font-bold text-2xl mb-2">{title}</h3>
            <p>{description}</p>
            <p className="font-bold pb-4">{price}</p>
        </div>
    );
};

export default ProductCard;