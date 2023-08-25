import { PrismaClient, Book } from '@prisma/client';


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ title }: Book): Promise<Book> => {
        const createdBook = await this.prisma.book.create({
            data: {
                title
            }
        });

        this.prisma.$disconnect();

        return createdBook;
    }
}

export default Repository;