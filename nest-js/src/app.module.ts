import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';
import { CustomerController } from './customer.controller';
import { UserStore } from './user.store';

@Module({
  imports: [],
  controllers: [UsersController,AdminController,CustomerController], 
  providers: [{provide:'store',useClass:UserStore}//,{provide: 'DB', useValue:"hahahahahahaha"}
    ,{
      provide:'something',
      useFactory:(limit:number=2)=>{
            return limit
      },
      inject:[{token:"DB",optional:true}]
    }
  ],
})
export class AppModule {}
