import { useState } from "react"
import { useAdvocatesQuery } from "./use-advocates-query";
export const useAdvocateSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const {advocates} = useAdvocatesQuery(searchTerm);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    };

    const resetSearch = () => {
        setSearchTerm('');
    };

    return {
        searchTerm,
        onChange,
        resetSearch,
        advocates
    }
    
}