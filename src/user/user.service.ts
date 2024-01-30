import { Injectable } from "@nestjs/common";

type user = {
    name: string;
    email: string;
    password: string;
};

@Injectable()
export class UserService {

    findById(id : Number): string {
        return `Párabens Akihito, Seu id é ${id}`
    }

    findAll() : {} {
        return {users : []}
    }

    async create(user: user): Promise<user> {
        return user;
    }

    async update(user: user, id : Number): Promise<{}> {
        return {
            message : "Put",
            user,
            id
        }
    }

    async updatePartial(user, id : Number) : Promise<{}> {
        return {
            message : "Patch",
            user,
            id
        }
    }

    async delete(id: Number): Promise<Number> {
        return id
    }
}