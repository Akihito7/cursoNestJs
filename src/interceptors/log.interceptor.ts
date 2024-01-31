import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

        const dateNow = Date.now();

        const request = context.switchToHttp().getRequest();
        console.log({
            url : request.url,
            method : request.method,
        })

        return next.handle().pipe(tap(() => {
            console.log(`A requisição durou ${Date.now() - dateNow} milissegundos`)
        }));
    }
}

// O pipe é um tubo que consegue executar algo depois que a função next tiver sido executada, ou seja vai continuar o fluxo chamando o controller e os services vai requisitar o banco de dados e depois disso ele vai executar o pipe

//a função tap serve pra que nos conseguimos guardas o retorno padrao a resposta do nosso controller para o usúario que chamou o end point ou seja, se o usuario ta pegando uma lista de users vamos guardar isso no tap e retornar para ele, e não retornar o codigo do pipe em si, pois nao é o que queremos!