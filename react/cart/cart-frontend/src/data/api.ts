import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import type {dwnProducts} from "../components/Display.tsx";

export const useAddProduct = () => {
    return useMutation({
        mutationFn: () => fetch('https://fakestoreapi.com/products').then(res => res.json())
    })
}

export const useProductData = () => {
    return useQuery({
        queryKey: ["Products"],
        queryFn: () => axios.get<dwnProducts[]>('/api/products').then(res => res.data)
    })
}

