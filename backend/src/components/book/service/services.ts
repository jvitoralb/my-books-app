import Repository from '../database/repository';

export interface Book {
    id: string;
    user_id: string;
    title: string;
    author: string;
    about: string;
    section: string;
    created_at: Date;
}

interface Service {
    saveBook(userId: string, bookInfo: Book): Promise<{ id: string; title: string }>;
    searchBooks(userId: string): Promise<Books>;
    changeBookInfo(userId: string, receivedInfo: Book): Promise<void>;
    changeBookSection(userId: string, id: string, section: string): Promise<void>;
    destroyBook(userId: string, id: string): Promise<void>;
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
    private user_id: string;
    private title: string;
    private author: string;
    private about: string;
    private section: string;
    private created_at: Date;

    constructor() {
        this.id = '';
        this.user_id = '';
        this.title = '';
        this.author = '';
        this.about = '';
        this.section = '';
        this.created_at = new Date();
    }

    protected set setId(id: string) {
        this.id = id;
    }
    protected set setUserId(userId: string) {
        this.user_id = userId;
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
            user_id: this.user_id,
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

    saveBook = async (userId: string, bookInfo: Book): Promise<{ id: string; title: string }> => {
        this.setUserId = userId;
        this.setBookInfo = bookInfo;

        const newBook = await this.repository.insert(this.getBook);

        return {
            id: newBook.id,
            title: newBook.title
        }
    }
    searchBooks = async (userId: string): Promise<Books> => {
        this.setUserId = userId;
        return await this.repository.findAll(this.getBook);
    }
    changeBookInfo = async (userId: string, receivedInfo: Book): Promise<void> => {
        this.setId = receivedInfo.id;
        this.setUserId = userId;
        this.setBookInfo = receivedInfo;

        await this.repository.updateInfo(this.getBook);
    }
    changeBookSection = async (userId: string, id: string, section: string): Promise<void> => {
        this.setId = id;
        this.setUserId = userId;
        this.setBookSection = section;

        await this.repository.updateSection(this.getBook);
    }
    destroyBook = async (userId: string, id: string): Promise<void> => {
        this.setId = id;
        this.setUserId = userId;

        await this.repository.delete(this.getBook);
    }
}

export default BookService;