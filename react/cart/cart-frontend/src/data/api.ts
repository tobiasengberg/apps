import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import type {dwnProducts} from "../components/Display.tsx";
import type {FormProps} from "../components/AddProductForm.tsx";

export const useAddProduct = () => {
    return useMutation({
        mutationFn: (item: FormProps) => {
            console.log(item);
            const response = axios.post<FormProps>('/api/products', item);
            return response;
        }
    })
}

export const useProductData = () => {
    return useQuery({
        queryKey: ["Products"],
        queryFn: () => axios.get<dwnProducts[]>('/api/products').then(res => res.data)
    })
}

