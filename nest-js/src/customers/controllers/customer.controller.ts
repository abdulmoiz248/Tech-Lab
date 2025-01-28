import { OnModuleInit, Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, UseFilters, UsePipes } from "@nestjs/common";

import {CustomerService} from '../providers/customer.service';

import {customer} from '../providers/customer.service';
import { CAPITALIZEPipe } from "../pipes/capitalize.pipe";
import { CustomerPipe } from "../pipes/customer.pipe";
import { CustomerSchma } from "../pipes/customer.schema";
import { IdException } from "../id-exception";
import { IdExceptionFilter } from "../id-exception.filter";
@Controller('/customer')
export class CustomerController  implements OnModuleInit{


    onModuleInit(){
        console.log('Customer Controller Initialized');
    }
    
    constructor(private service:CustomerService){
        
    }
    @Get()
    getAllCustomers(){
        return this.service.getAllCustomers();
    }

    @Get('/:id')
    @UseFilters(IdExceptionFilter)
    getCustomerById(@Param('id',ParseIntPipe) id:number){
        if(id<=0)
        {
            //throw new HttpException('Invalid Customer Id',400);
           //   throw new BadRequestException('Invalid Customer Id');
           throw new IdException();

        }
        return this.service.getCustomerById(id);
    }

    @Post()
    addCustomer(@Body(new CustomerPipe(CustomerSchma)) body:customer){
      return this.service.addCustomer(body);
    }

    @Patch('/:id')
    updateCustomer(@Param('id',ParseIntPipe) param:number, @Body() body:customer){
return this.service.updateCustomer(param,body);      

    }
    
    @Delete('/:id')
    @UsePipes(ParseIntPipe)
    deleteCustomer(@Param('id') id:number){
      return this.service.deleteCustomer(id);
    }

    @Get('/search/:name')
    searchCustomer(@Param('name',CAPITALIZEPipe) name:string){
        return name;
    }
}