// export function customerMiddleware(req, res, next) {

import { NestMiddleware } from "@nestjs/common";

 
//     console.log('Customer middleware invoked');
 
//     const ua=req.headers['user-agent'];

//     req['ua'] = ua + ' - Customer';

//     next()
// }

export class CustomerMiddleware implements NestMiddleware{


    use(req, res, next) {
        console.log('Customer middleware invoked');
        const ua=req.headers['user-agent'];
        req['ua'] = ua + ' - Customer';
        next()
    }
}