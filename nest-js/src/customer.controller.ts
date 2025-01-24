import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";


interface customer{
    id:string;
    name:string;
    age:number;
}
let CUSTOMERS:customer[]=[]


@Controller('/customer')
export class CustomerController {

    @Get()
    getAllCustomers(){
        return CUSTOMERS;
    }

    @Get('/:id')
    getCustomerById(@Param('id') id:string){
        return CUSTOMERS.find((u:customer)=>u.id===id);
    }

    @Post()
    addCustomer(@Body() body:customer){
        CUSTOMERS.push(body);
        return 'Customer added successfully';
    }

    @Patch('/:id')
    updateCustomer(@Param('id') param:string, @Body() body:customer){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===param);
        if(index!==-1){
            CUSTOMERS[index]=body;
            return 'Customer updated!';
        }else {
            return 'Customer not found';
        }

    }
    
    @Delete('/:id')
    deleteCustomer(@Param('id') id:string){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===id);
        if(index!==-1){
            CUSTOMERS.splice(index,1);
            return 'Customer deleted successfully';
        }else {
            return 'Customer not found';
        }
    }
}