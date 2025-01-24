import {  Injectable } from "@nestjs/common";
export interface customer{
    id:string;
    name:string;
    age:number;
}
export let CUSTOMERS:customer[]=[]

@Injectable()
export class CustomerService{
    
    
    getAllCustomers(){
        return CUSTOMERS;
    }

  
    getCustomerById(id:string){
        return CUSTOMERS.find((u:customer)=>u.id===id);
    }

    addCustomer(body:customer){
        CUSTOMERS.push(body);
        return 'Customer added successfully';
    }

   
    updateCustomer(param:string, body:customer){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===param);
        if(index!==-1){
            CUSTOMERS[index]=body;
            return 'Customer updated succesfully!';
        }else {
            return 'Customer not found';
        }

    }
    
    deleteCustomer( id:string){
        const index = CUSTOMERS.findIndex((u:customer)=>u.id===id);
        if(index!==-1){
            CUSTOMERS.splice(index,1);
            return 'Customer deleted successfully';
        }else {
            return 'Customer not found';
        }
    }

}