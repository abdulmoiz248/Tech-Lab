import { Module } from "@nestjs/common";
import { AdminController } from "./controllers/admin.controller";

@Module({
    imports:[],
    controllers:[AdminController],
    providers:[]
})
export class AdminModule{

}