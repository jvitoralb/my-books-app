import Repository from '../database/repository';

export interface Book {
    id: string;
    user_id: string;
    title: string;
    author: string | null;
    about: string | null;
    section: string | null;
    created_at: Date;
}

type BookInfo = {
    title: string;
    author: string | null;
    about: string | null;
}

interface Service {
    saveBook(receivedData: Book): Promise<{ id: string; title: string }>;
    searchBooks(userId: string): Promise<Book[]>;
    changeBookInfo(receivedInfo: Book): Promise<void>;
    changeBookSection(receivedData: Book): Promise<void>;
    destroyBook(userId: string, id: string): Promise<void>;
}

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
    protected set setBookSection(section: string | null) {
        this.section = section || '';
    }
    protected set setBookInfo(info: BookInfo) {
        this.title = info.title || '';
        this.author = info.author || '';
        this.about = info.about || '';
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

    saveBook = async ({ user_id, ...rest }: Book): Promise<{ id: string; title: string }> => {
        this.setUserId = user_id;
        this.setBookInfo = {
            title: rest.title,
            author: rest.author,
            about: rest.about
        };

        const newBook = await this.repository.insert(this.getBook);

        return {
            id: newBook.id,
            title: newBook.title
        }
    }
    searchBooks = async (userId: string): Promise<Book[]> => {
        this.setUserId = userId;
        return await this.repository.findAll(this.getBook);
    }
    changeBookInfo = async ({ id, user_id, ...rest }: Book): Promise<void> => {
        this.setId = id;
        this.setUserId = user_id;
        this.setBookInfo = {
            title: rest.title,
            author: rest.author,
            about: rest.about
        };

        await this.repository.updateInfo(this.getBook);
    }
    changeBookSection = async ({ user_id, id, section }: Book): Promise<void> => {
        this.setId = id;
        this.setUserId = user_id;
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