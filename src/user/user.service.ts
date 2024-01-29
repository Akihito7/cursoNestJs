import { Injectable } from "@nestjs/common";

type user = {
    name: string;
    email: string;
    password: string;
};

@Injectable()
export class UserService {

    findById(id : string): string {
        return `Párabens Akihito, Seu id é ${id}`
    }

    findAll() : {} {
        return {users : []}
    }

    async create(user: user): Promise<user> {
        return user;
    }

    async update(user: user, id : string): Promise<{}> {
        return {
            user,
            id
        }
    }

    async delete(id: string): Promise<string> {
        return id
    }
}