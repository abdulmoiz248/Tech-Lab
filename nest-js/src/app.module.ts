import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { CustomersModule } from './customers/customer.module';

//@Global() =  har jagha withotu import kye use hojaye ga
// if not global then dosre modules me import karna parega



@Module({
  imports: [UserModule,CustomersModule],
  controllers: [], 
  providers: [],
})
export class AppModule {}
