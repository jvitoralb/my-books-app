import { PrismaClient } from '@prisma/client'
import { User } from '../service/services'


class Repository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    insert = async ({ email, name, pswd_hash, pswd_salt }: User): Promise<User | undefined> => {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    pswd_hash,
                    pswd_salt
                }
            });
            return newUser;
        } catch(err) {
            console.log(err);
        } finally {
            this.prisma.$disconnect();
        }
    }
}

export default Repository;