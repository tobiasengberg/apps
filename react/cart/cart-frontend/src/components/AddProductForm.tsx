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
        <form className="flex flex-col p-2" onSubmit={handleSubmit(onSubmit)}>

            <label>Name</label>
            <input className="border-1 border-slate-200 mb-3" {...register("name")} />
            <label>Description</label>
            <input className="border-1 border-slate-200 mb-3" {...register("description")} />
            <label>Price</label>
            <input className="border-1 border-slate-200 mb-6" {...register("price")} />
            <input className="bg-slate-500 text-white w-full py-5" type="submit" value="Add Product"/>
        </form>
    );
};

export default AddProductForm;