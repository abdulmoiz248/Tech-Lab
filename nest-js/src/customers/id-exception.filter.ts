import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { IdException } from "./id-exception";


export class IdExceptionFilter implements ExceptionFilter{

    catch(exception:IdException,host:ArgumentsHost){
        return host.switchToHttp().getResponse().status(400).json({message:exception.message});
    }
}