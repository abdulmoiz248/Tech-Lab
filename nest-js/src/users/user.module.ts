import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserStore } from './providers/user.store';
import { AdminModule } from './admin/admin.module';

//admin module is not mentioned in app.module becuase it is already imported in user module and it is nested
@Module({
  imports: [AdminModule],
  controllers: [UsersController], 
  providers: [UserStore,{provide:'store',useClass:UserStore}//,{provide: 'DB', useValue:"hahahahahahaha"}
    ,{
      provide:'something',
      useFactory:(limit:number=2)=>{
            return limit
      },
      inject:[{token:"DB",optional:true}]
    }
  ],
  exports:[UserStore,AdminModule]
})
export class UserModule {}
