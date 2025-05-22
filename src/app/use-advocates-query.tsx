import { useQuery } from "@tanstack/react-query"

export const useAdvocatesQuery = () => {

    const {data} = useQuery({
        queryKey: ['advocates'],
        queryFn: () => fetch('/api/advocates').then((response) => response.json()),
        select: (response) => response.data
    }) 
    return {
        advocates: data
    }
}