import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes } from "@nestjs/common";

import {CustomerService} from '../providers/customer.service';

import {customer} from '../providers/customer.service';
import { CAPITALIZEPipe } from "../pipes/capitalize.pipe";
@Controller('/customer')
export class CustomerController {


    constructor(private service:CustomerService){
        
    }
    @Get()
    getAllCustomers(){
        return this.service.getAllCustomers();
    }

    @Get('/:id')
    getCustomerById(@Param('id',ParseIntPipe) id:number){
        return this.service.getCustomerById(id);
    }

    @Post()
    addCustomer(@Body() body:customer){
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