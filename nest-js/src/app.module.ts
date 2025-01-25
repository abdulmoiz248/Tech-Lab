import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';

//@Global() =  har jagha withotu import kye use hojaye ga
// if not global then dosre modules me import karna parega



@Module({
  imports: [UserModule],
  controllers: [], 
  providers: [],
})
export class AppModule {}
