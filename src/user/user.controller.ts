import { Body, Controller, Delete, Get, Param, Post, Put, Patch, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UpdatePartialUserDTO } from "./dtos/updatePartial-user.dto";

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id : Number) {
        return this.userService.findById(id)
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }


    @Post()
    async create(@Body() body : CreateUserDTO) {
        return this.userService.create(body);
    }

    @Put(":id")
    async update(@Body() body : UpdateUserDTO, @Param("id", ParseIntPipe) id : Number) {
        return this.userService.update(body,id);
    }

    @Patch(":id")
    async updatePartial(@Body() body : UpdatePartialUserDTO , @Param("id", ParseIntPipe) id : Number) {
        return this.userService.updatePartial(body, id)
    }


    //Vale notar que posso pegar um parametro especifico ou pegar todos!
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id : Number, @Param() params){
        return this.userService.delete(id)
    }

}