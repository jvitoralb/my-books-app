import { PrismaClient, Prisma, Book } from '@prisma/client';
import { BadRequestError } from '../../../lib/errors/custom';


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ user_id, title, author, about }: Book): Promise<Book> => {
        const createdBook = await this.prisma.book.create({
            data: {
                user_id,
                title,
                author,
                about
            }
        });

        this.prisma.$disconnect();

        return createdBook;
    }
    findAll = async ({ user_id }: Book): Promise<Book[]> => {
        const foundBooks = await this.prisma.book.findMany({
            where: { user_id }
        });

        this.prisma.$disconnect();

        return foundBooks;
    }
    updateInfo = async ({ id, user_id, title, author, about }: Book): Promise<void> => {
        await this.prisma.book.update({
            where: {
                id,
                user_id
            },
            data: {
                title,
                author,
                about
            }
        });

        this.prisma.$disconnect();
    }
    updateSection = async ({ id, user_id, section }: Book): Promise<void> => {
        await this.prisma.book.update({
            where: {
                id,
                user_id
            },
            data: { section }
        });

        this.prisma.$disconnect();
    }
    delete = async ({ id, user_id }: Book): Promise<void> => {
        try {
            await this.prisma.book.delete({
                where: {
                    id,
                    user_id
                }
            });
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2025') {
                    throw new BadRequestError('Book does not exists');
                }
            }
            throw err;
        } finally {
            this.prisma.$disconnect();
        }

    }
}

export default Repository;