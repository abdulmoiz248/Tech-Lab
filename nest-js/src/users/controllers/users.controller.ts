import { Controller, Get, HttpCode, HttpStatus, Inject, Redirect, Req } from "@nestjs/common";
import { UserStore } from "../providers/user.store";

@Controller('/users')
export class UsersController{

    
  constructor(@Inject('something') store:string){
       console.log('User Controller created');
       console.log(store);
  }




    // @Get('/profile')
    // @HttpCode(HttpStatus.PARTIAL_CONTENT) //status code

   

    // @Get('/accounts')
    // getAccounts() {
    //     return 'This is your accounts';
    // }
    // @Get('/wallet')
    // getWallet() {
    //     return 'This is your accounts';
    // }
}