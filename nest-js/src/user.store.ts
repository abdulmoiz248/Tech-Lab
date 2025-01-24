import { Injectable,Req, Scope } from "@nestjs/common";


//DEFAULT=ONE INSTANCE PER MODULE
//REQUEST=ONE INSTANCE PER REQUEST
//TRANSIENT=ONE INSTANCE PER CALL
@Injectable({scope:Scope.DEFAULT})
export class UserStore{
 getProfile(@Req() req) {
    let n=4;
    if(n>5)
        return {
        url:'/users/accounts'
      };
    else
        return {
        url:'/users/wallet'
      };
    }
}


