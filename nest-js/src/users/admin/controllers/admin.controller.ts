import { Body, Controller, Get, Ip, Param, Post, Query } from "@nestjs/common";


@Controller('/admin')
export class AdminController{
     
    @Get('/:id/:name')
    getDashboard(@Param('name') params,@Ip() ip) {
        console.log(ip);  // Will print: { id: '123' }
        return 'This is your dashboard';
    }
    @Get('/profile')
    getProfile(@Query() query){
        console.log(query); 
        return 'This is your profile';
    }

    @Post('/add-user')
    addUser(@Body('name') body){
        console.log(body);
        return 'User added successfully';
    }
}