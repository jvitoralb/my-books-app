import Repository from '../database/repository';

export interface Book {
    id: string;
    title: string;
    author: string;
    about: string;
    section: string;
    created_at: Date;
}

abstract class BookData {
    private id: string;
    private title: string;
    private author: string;
    private about: string;
    private section: string;
    private created_at: Date;

    constructor() {
        this.id = '';
        this.title = '';
        this.author = '';
        this.about = '';
        this.section = '';
        this.created_at = new Date();
    }

    protected set setBookInfo(receivedBook: Book) {
        this.title = receivedBook.title || '';
        this.author = receivedBook.author || '';
        this.about = receivedBook.about || '';
    }
    protected set setId(id: string) {
        this.id = id;
    }
    protected get getBook(): Book {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            about: this.about,
            section: this.section,
            created_at: this.created_at
        }
    }
}

interface Service {
    saveBook(bookInfo: Book): Promise<{ id: string; title: string }>
}

class BookService extends BookData implements Service {
    private repository: Repository;

    constructor() {
        super();
        this.repository = new Repository();
    }

    saveBook = async (bookInfo: Book): Promise<{ id: string; title: string }> => {
        this.setBookInfo = bookInfo;

        const newBook = await this.repository.insert(this.getBook);

        return {
            id: newBook.id,
            title: newBook.title
        }
    }
}

export default BookService;