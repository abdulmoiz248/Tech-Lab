import {  OnModuleInit,Injectable } from "@nestjs/common";
export interface customer{
    id:number;
    name:string;
    age:number;
}
export let CUSTOMERS:customer[]=[]

@Injectable()
export class CustomerService  implements OnModuleInit{


    onModuleInit(){
        console.log('Customer services Initialized');
    }
    
    
    getAllCustomers(){
        return CUSTOMERS;
    }

  
    getCustomerById(id:number){
        return CUSTOMERS.find((u:customer)=>u.id===id);
    }

    addCustomer(body:customer){
        CUSTOMERS.push(body);
        return 'Customer added successfully';
    }

   
    updateCustomer(param:number, body:customer){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===param);
        if(index!==-1){
            CUSTOMERS[index]=body;
            return 'Customer updated succesfully!';
        }else {
            return 'Customer not found';
        }

    }
    
    deleteCustomer( id:number){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===id);
        if(index!==-1){
            CUSTOMERS.splice(index,1);
            return 'Customer deleted successfully';
        }else {
            return 'Customer not found';
        }
    }

}