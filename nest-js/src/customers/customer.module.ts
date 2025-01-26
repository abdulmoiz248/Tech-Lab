import { Module } from "@nestjs/common";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerService } from "./providers/customer.service";
import { APP_PIPE } from "@nestjs/core";
import { CAPITALIZEPipe } from "./pipes/capitalize.pipe";

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService,/*{provide: APP_PIPE, useClass:CAPITALIZEPipe} it will make it global*/ ],
    exports: []
})
export class CustomersModule {}