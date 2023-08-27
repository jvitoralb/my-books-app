import Repository from '../database/repository';

export interface Book {
    id: string;
    title: string;
    author: string;
    about: string;
    section: string;
    created_at: Date;
}

interface Service {
    saveBook(bookInfo: Book): Promise<{ id: string; title: string }>;
    searchBooks(): Promise<Books>;
    changeBookInfo(receivedInfo: Book): Promise<void>;
    changeBookSection(id: string, section: string): Promise<void>;
    destroyBook(id: string): Promise<void>;
}

type Books = {
    id: string;
    title: string;
    author: string | null;
    about: string | null;
    section: string | null;
    created_at: Date;
}[];

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

    protected set setId(id: string) {
        this.id = id;
    }
    protected set setBookSection(section: string) {
        this.section = section;
    }
    protected set setBookInfo(receivedBook: Book) {
        this.title = receivedBook.title || '';
        this.author = receivedBook.author || '';
        this.about = receivedBook.about || '';
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
    searchBooks = async (): Promise<Books> => {
        return await this.repository.findAll();
    }
    changeBookInfo = async (receivedInfo: Book): Promise<void> => {
        this.setId = receivedInfo.id;
        this.setBookInfo = receivedInfo;

        await this.repository.updateInfo(this.getBook);
    }
    changeBookSection = async (id: string, section: string): Promise<void> => {
        this.setId = id;
        this.setBookSection = section;

        await this.repository.updateSection(this.getBook);
    }
    destroyBook = async (id: string): Promise<void> => {
        this.setId = id;

        await this.repository.delete(this.getBook);
    }
}

export default BookService;