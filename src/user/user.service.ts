import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UpdatePartialUserDTO } from "./dtos/updatePartial-user.dto";
import * as bcrypt from "bcrypt";


type user = {
    name: string;
    email: string;
    password: string;
};

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    findById(id: number) {

        return this.prisma.users.findUnique({
            where: {
                id
            }
        })

    }

    findAll() {
        return this.prisma.users.findMany();
    }

    async create({ name, email, password, roles }): Promise<user> {


        password = await bcrypt.hash(password, 8);

        return await this.prisma.users.create({
            data: {
                name,
                email,
                password,
                roles
            }
        })

    }

    async update({ name, email, password, birthdayAt }: UpdateUserDTO, id: number) {

        if (!await this.userExists(id)) throw new NotFoundException("Usúario não encontrado em nossa base de dados");

        password = await bcrypt.hash(password, 8);

        return this.prisma.users.update({
            data: {
                name,
                email,
                password,
                updateAt: new Date(),
                birthdayAt: birthdayAt ? new Date(birthdayAt) : null,
            },
            where: { id }
        });

    }

    async updatePartial(user: UpdatePartialUserDTO, id: number): Promise<{}> {

        if (!await this.userExists(id)) throw new NotFoundException("Usúario não encontrado em nossa base de dados");

        if (user.password) user.password = await bcrypt.hash(user.password, 8);


        return this.prisma.users.update({
            data: {
                ...user,
                birthdayAt: user.birthdayAt ? new Date(user.birthdayAt) : null,

            },
            where: { id }
        });
    }

    async delete(id: number) {

        if (!await this.userExists(id)) throw new NotFoundException("Usúario não encontrado em nossa base de dados");

        return this.prisma.users.delete({
            where: { id }
        })
    }

    async userExists(id: number) {

        return this.prisma.users.findUnique({
            where: { id }
        })

    }


}