import { useQuery } from "@tanstack/react-query"

export const useAdvocatesQuery = (searchQuery: string = '') => {

    const {data} = useQuery({
        queryKey: ['advocates', searchQuery],
        queryFn: () => fetch(`/api/advocates?q=${searchQuery}`).then((response) => response.json()),
        select: (response) => response.data,
    }) 
    return {
        advocates: data
    }
}