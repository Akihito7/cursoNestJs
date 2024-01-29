import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


//Aqui o controller diferente do Node js puro, que o controller lida com a logica em si que será executada em cada endpoint da api, aqui ele lida mais com a requisição o tipo dela, Get, Post etc e diz qual service sera executado para servir o response

//Quem lida com a parte da logica pesada aqui é o Service, faz basicamente o papel do controller no node js puro, o service ele é injetado no controller com o decorator @Injectable


