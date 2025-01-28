import { BeforeApplicationShutdown, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { CustomersModule } from './customers/customer.module';

//@Global() =  har jagha withotu import kye use hojaye ga
// if not global then dosre modules me import karna parega



@Module({
  imports: [UserModule,CustomersModule],
  controllers: [], 
  providers: [],
})
export class AppModule implements OnApplicationBootstrap,OnApplicationShutdown,BeforeApplicationShutdown {
  onApplicationBootstrap() {
    console.log('Application has started!');
  }
  onApplicationShutdown() {
    console.log('Application has stopped!');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('Application is shutting down!',signal);
  }

 
}
