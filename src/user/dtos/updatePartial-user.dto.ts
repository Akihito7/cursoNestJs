import { UpdateUserDTO } from "./update-user.dto";
import { PartialType } from "@nestjs/mapped-types";


//Aqui estamos usando a lib Mapped pra dizer que o DTO pode ser parcial ja que geralmente o metodo Http PATCH é usado pra alterar so alguns campos
export class UpdatePartialUserDTO extends PartialType(UpdateUserDTO) {}