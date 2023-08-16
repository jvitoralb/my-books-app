import { PrismaClient, Prisma } from '@prisma/client'
import { User } from '../service/services'
import { BadRequestError, ServerError } from '../../../lib/errors/custom';


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ email, name, pswd_hash, pswd_salt }: User): Promise<User | undefined> => {
        try {
            return await this.prisma.user.create({
                data: {
                    email,
                    name,
                    pswd_hash,
                    pswd_salt
                }
            });
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new BadRequestError('Email already exists');
                }
            }
            throw new ServerError();
        } finally {
            this.prisma.$disconnect();
        }
    }
}

export default Repository;