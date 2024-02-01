import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class JsonWebTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization;
        
        console.log("middleware de verificação de json web token");

        if(!authHeader) throw new UnauthorizedException("Token não informado ou inexistente");

        console.log("token =>", authHeader);

        next();
    }
}