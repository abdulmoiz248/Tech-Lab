import { Body, Controller, Delete, Get, Param, Patch, Post,Inject } from "@nestjs/common";

import {CustomerService} from './customer.service';

export interface customer{
    id:string;
    name:string;
    age:number;
}
@Controller('/customer')
export class CustomerController {


    constructor(private service:CustomerService){
        
    }
    @Get()
    getAllCustomers(){
        return this.service.getAllCustomers();
    }

    @Get('/:id')
    getCustomerById(@Param('id') id:string){
        return this.service.getCustomerById(id);
    }

    @Post()
    addCustomer(@Body() body:customer){
      return this.service.addCustomer(body);
    }

    @Patch('/:id')
    updateCustomer(@Param('id') param:string, @Body() body:customer){
return this.service.updateCustomer(param,body);      

    }
    
    @Delete('/:id')
    deleteCustomer(@Param('id') id:string){
      return this.service.deleteCustomer(id);
    }
}