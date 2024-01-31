import { Body, Controller, Delete, Get, Param, Post, Put, Patch, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UpdatePartialUserDTO } from "./dtos/updatePartial-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";


@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id : number) {
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
    async update(@Body() user, @Param("id", ParseIntPipe) id : number) {
        return this.userService.update(user,id);
    }

    @Patch(":id")
    async updatePartial(@Body() user , @Param("id", ParseIntPipe) id : number) {
        return this.userService.updatePartial(user, id)
    }


    //Vale notar que posso pegar um parametro especifico ou pegar todos!
    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id : number){
        return this.userService.delete(id)
    }

}