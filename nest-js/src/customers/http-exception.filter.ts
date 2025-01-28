import { ExceptionFilter,  ArgumentsHost, HttpException } from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.getResponse();
    console.log('message', message);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),  
    })
}}