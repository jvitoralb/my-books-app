import { PrismaClient, Prisma, User } from '@prisma/client';
import { BadRequestError } from '../../../lib/errors/custom';


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ email, name, pswd_hash, pswd_salt }: User): Promise<User> => {
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
            throw err;
        } finally {
            this.prisma.$disconnect();
        }
    }
    findDocument = async ({ email }: User): Promise<User> => {
        const doc = await this.prisma.user.findUnique({ where: { email } });

        this.prisma.$disconnect();

        if (doc === null) {
            throw new BadRequestError('User does not exists');
        }
        return doc;
    }
    find = async ({ id, email }: User): Promise<{ email: string; name: string; }> => {
        const userFound = await this.prisma.user.findUnique({
            where: {
                id,
                email
            },
            select: {
                email: true,
                name: true
            }
        });

        this.prisma.$disconnect();

        if (userFound === null) {
            throw new BadRequestError('User does not exists');
        }

        return userFound;
    }
    updateEmail = async ({ id, email }: User, newEmail: string): Promise<User> => {
        try {
            return await this.prisma.user.update({
                where: {
                    id,
                    email
                },
                data: { email: newEmail }
            });
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new BadRequestError('Email already exists');
                }
            }
            throw err;
        } finally {
            this.prisma.$disconnect();
        }
    }
    updatePswd= async ({ id, pswd_hash, pswd_salt }: User): Promise<void> => {
        await this.prisma.user.update({
            where: { id },
            data:{
                pswd_hash,
                pswd_salt
            }
        });

        this.prisma.$disconnect();
    }
    delete = async ({ id, email }: User): Promise<void> => {
        await this.prisma.user.delete({
            where: {
                id,
                email
            }
        });

        this.prisma.$disconnect();
    }
}

export default Repository;