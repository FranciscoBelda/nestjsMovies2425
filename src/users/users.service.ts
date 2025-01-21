import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./interfaces/user/user.interface";
import {UserDto} from "./dto/user.dto/user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel('User')
                private userModel: Model<User>) {
    }

    // Crear usuario -> REGISTER
    async create(userDto: UserDto): Promise<any>{
        const createdUser = new this.userModel(userDto);
        return await createdUser.save();
    }

    async findOne(condition: any): Promise<any>{
        return this.userModel.findOne(condition).exec();
    }


}
