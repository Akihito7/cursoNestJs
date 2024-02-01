import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((filter : string, context : ExecutionContext) => {

    const request = context.switchToHttp().getRequest();
    if(filter) {
        return request.user[filter]
    }
    return request.user;
})
