import {type SubmitHandler, useForm} from "react-hook-form";
import {useAddProduct} from "../data/api.ts";

export interface FormProps {
    name: string,
    description: string,
    price: number
}


const AddProductForm = () => {
    const { handleSubmit, register} = useForm<FormProps>()
    const addProduct = useAddProduct();

    const onSubmit : SubmitHandler<FormProps> = (data) => {
        addProduct.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input {...register("name")} />
            <label>Description</label>
            <input {...register("description")} />
            <label>Price</label>
            <input {...register("price")} />
            <input type="submit" value="Add Product"/>
        </form>
    );
};

export default AddProductForm;