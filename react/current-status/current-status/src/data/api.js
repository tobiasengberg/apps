import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";


export const useAddStatus = () => {
    return useMutation({
        mutationFn: (item) => {
            return axios.post('/api/status', item)
                .then(res => res.data)
        }
    })
}

export const useGetStatuses = () => {
    return useQuery({
        queryKey: ["statuses"],
        queryFn: () => {
            return axios.get('/api/status')
                .then(res => res.data)
        }
    })
}
