import { useState } from "react"
import { useAdvocatesQuery } from "./use-advocates-query";
import { useDebounce } from "./use-debounce";
export const useAdvocateSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 300);
    const {advocates} = useAdvocatesQuery(debouncedSearch);

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