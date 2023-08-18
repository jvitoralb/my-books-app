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
            console.log(err);
            throw new ServerError();
        } finally {
            this.prisma.$disconnect();
        }
    }
    updateEmail = async ({ id, email }: User): Promise<User> => {
        try {
            return await this.prisma.user.update({
                where: { id },
                data:{ email }
            });
        } catch(err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new BadRequestError('Email already exists');
                }
            }
            console.log(err);
            throw new ServerError();
        } finally {
            this.prisma.$disconnect();
        }
    }
    updatePswd= async ({ id, pswd_hash, pswd_salt }: User): Promise<void> => {
        try {
            await this.prisma.user.update({
                where: { id },
                data:{
                    pswd_hash,
                    pswd_salt
                }
            });
        } catch(err) {
            console.log(err);
            throw new ServerError();
        } finally {
            this.prisma.$disconnect();
        }
    }
}

export default Repository;