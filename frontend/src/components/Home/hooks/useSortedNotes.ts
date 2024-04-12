import { BookNote } from '../../../types';


const useSortedNotes = (notes: BookNote[]) => {
    const compareDates = (a: BookNote, b: BookNote) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }

    notes.sort(compareDates);
}

export default useSortedNotes;