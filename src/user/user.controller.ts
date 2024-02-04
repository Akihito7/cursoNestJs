import { Body, Controller, Delete, Get, Param, Post, Put, Patch, ParseIntPipe, UseInterceptors, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { UpdatePartialUserDTO } from "./dtos/updatePartial-user.dto";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { ThrottlerGuard } from "@nestjs/throttler";


@UseGuards(AuthGuard,RoleGuard)
@Roles(Role.admin)
@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get(":id")
    findById(@ParamId("id") id : number) {
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
    async update(@Body() user, @ParamId("id") id : number) {
        return this.userService.update(user,id);
    }
     

    @Patch(":id")
    async updatePartial(@Body() user , @ParamId("id") id : number) {
        return this.userService.updatePartial(user, id)
    }

    //Vale notar que posso pegar um parametro especifico ou pegar todos!

    @Delete(":id")
    delete(@ParamId("id") id : number){
        return this.userService.delete(id)
    }

}