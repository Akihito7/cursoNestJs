import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Eu sou pica e vou aprender isso, porque eu não desisto! ';
  }
}
