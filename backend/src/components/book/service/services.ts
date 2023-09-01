import Repository from '../database/repository';

export type BookInfo = {
    title: string;
    author: string | null;
    about: string | null;
}
export type BookSection = {
    section: string | null;
}
type NewBook = {
    id: string;
    title: string;
}

interface Book {
    id: string;
    user_id: string;
    title: string;
    author: string | null;
    about: string | null;
    section: string | null;
    created_at: Date;
}
interface Service {
    saveBook(userId: string, receivedInfo: BookInfo): Promise<NewBook>;
    searchBooks(userId: string): Promise<Book[]>;
    changeBookInfo(bookId: string, userId: string, newInfo: BookInfo): Promise<void>;
    changeBookSection(bookId: string, userId: string, newSec: BookSection): Promise<void>;
    destroyBook(bookId: string, userId: string): Promise<void>;
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
    protected set setBookSection(sec: BookSection) {
        this.section = sec.section || '';
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

    saveBook = async (userId: string, receivedInfo: BookInfo): Promise<NewBook> => {
        this.setUserId = userId;
        this.setBookInfo = receivedInfo;

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
    changeBookInfo = async (bookId: string, userId: string, newInfo: BookInfo): Promise<void> => {
        this.setId = bookId;
        this.setUserId = userId;
        this.setBookInfo = newInfo;

        await this.repository.updateInfo(this.getBook);
    }
    changeBookSection = async (bookId: string, userId: string, newSec: BookSection): Promise<void> => {
        this.setId = bookId;
        this.setUserId = userId;
        this.setBookSection = newSec;

        await this.repository.updateSection(this.getBook);
    }
    destroyBook = async (bookId: string, userId: string): Promise<void> => {
        this.setId = bookId;
        this.setUserId = userId;

        await this.repository.delete(this.getBook);
    }
}

export default BookService;