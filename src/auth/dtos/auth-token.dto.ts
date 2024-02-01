import { IsJWT } from "class-validator";

export class AuthTokenDTO {
    
    @IsJWT()
    token : string;
}