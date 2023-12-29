import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '../../../api/books';


const useBooksQuery = () => {
    const {
        refetch,
        data,
    } = useQuery({
        queryKey: ['books'],
        queryFn: getAllBooks,
        enabled: false,
    });

    return {
        fetchBooks: refetch,
        fetchResult: data,
    }
}

export default useBooksQuery;