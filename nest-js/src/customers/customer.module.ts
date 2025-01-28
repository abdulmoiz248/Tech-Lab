import {OnModuleInit, Module ,OnModuleDestroy, NestModule, MiddlewareConsumer, RequestMethod} from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerService } from "./providers/customer.service";
import { APP_PIPE } from "@nestjs/core";
import { CAPITALIZEPipe } from "./pipes/capitalize.pipe";
import { CustomerMiddleware } from "src/middlewares/customer.middleware";

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService,/*{provide: APP_PIPE, useClass:CAPITALIZEPipe} it will make it global*/ ],
    exports: []
})
export class CustomersModule implements OnModuleInit,OnModuleDestroy,NestModule{

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CustomerMiddleware).exclude({path:"/",method:RequestMethod.DELETE}).
        forRoutes('/customer',{path:"/",method:RequestMethod.GET})
       // consumer.apply(CustomerMiddleware).forRoutes('/customer',{path:"/",method:RequestMethod.GET})
    }

    onModuleInit(){
        console.log('Customer module Initialized');
    }
    onModuleDestroy() {
        console.log('Customer module destroyed');
    }
}