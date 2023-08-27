import { PrismaClient, Book } from '@prisma/client';


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ title, author, about }: Book): Promise<Book> => {
        const createdBook = await this.prisma.book.create({
            data: {
                title,
                author,
                about
            }
        });

        this.prisma.$disconnect();

        return createdBook;
    }
    findAll = async (): Promise<Book[]> => {
        return await this.prisma.book.findMany();
    }
    updateInfo = async ({ id, title, author, about }: Book): Promise<void> => {
        await this.prisma.book.update({
            where: { id },
            data: {
                title,
                author,
                about
            }
        });

        this.prisma.$disconnect();
    }
    updateSection = async ({ id, section }: Book): Promise<void> => {
        await this.prisma.book.update({
            where: { id },
            data: { section }
        });

        this.prisma.$disconnect();
    }
    delete = async ({ id }: Book): Promise<void> => {
        await this.prisma.book.delete({
            where: { id }
        });

        this.prisma.$disconnect();
    }
}

export default Repository;