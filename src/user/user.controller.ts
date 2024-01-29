import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(":id")
    findById(@Param("id") id) {
        return this.userService.findById(id)
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }


    @Post()
    async create(@Body() body) {
        return this.userService.create(body);
    }

    @Put(":id")
    async update(@Body() body, @Param("id") id) {
        return this.userService.update(body,id);
    }


    //Vale notar que posso pegar um parametro especifico ou pegar todos!
    @Delete(":id")
    delete(@Param("id") id, @Param() params){
        return this.userService.delete(id)
    }

}