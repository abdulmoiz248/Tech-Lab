import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CAPITALIZEPipe implements PipeTransform {
    constructor(){
        console.log('CAPITALIZEPipe created');
    }
  transform(value: any) {
    return value.toUpperCase();
  }
}