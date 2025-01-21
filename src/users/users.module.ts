import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema/user.schema";
import {JwtModule} from "@nestjs/jwt";
import 'dotenv/config';

@Module({
  imports: [
      MongooseModule.forFeature(
          [
            {
              name: 'User',
              schema: UserSchema
            }
          ]
      ),
      JwtModule.register({
          secret: process.env.SECRET,
          signOptions: {expiresIn: '3h'}
      })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
