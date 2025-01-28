export function customerMiddleware(req, res, next) {
 
    console.log('Customer middleware invoked');
 
    const ua=req.headers['user-agent'];

    req['ua'] = ua + ' - Customer';

    next()
}