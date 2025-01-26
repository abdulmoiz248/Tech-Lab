import { PipeTransform } from "@nestjs/common";
import { customer } from "../providers/customer.service";
import { ObjectSchema } from "joi";


export class CustomerPipe implements PipeTransform{

    constructor(private schema:ObjectSchema){

    }
    transform(value:any){
       const err= this.schema.validate(value);
       if(err.error){
           throw new Error(err.error.message);
       }
         return value;
    }
}