import {
    Body,
    Controller, Get,
    InternalServerErrorException,
    NotFoundException,
    Post, Req,
    UnauthorizedException
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserDto} from "./dto/user.dto/user.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Request} from "express";

@Controller('api/v1/users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(@Body() userDto: UserDto){
        const hashedPassword = await bcrypt.hash(
            userDto.password, 12);

        try{
            const user = await this.userService.create({
                username: userDto.username,
                email: userDto.email,
                avatar: userDto.avatar,
                password: hashedPassword
            });
            const jwt = await this.jwtService.signAsync({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
            return {
                ok: true,
                token: jwt
            }
        }catch (e: any) {
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }

    @Post('login')
    async login(
        @Body('email')email: string,
        @Body('password')password: string
    ){
        try{
            const user = await this.userService.findOne(
                {email}
            )
            if(!user){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                })

            }
            if (!(await bcrypt.compare(password, user.password))){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Usuario o Contraseña incorrectas'
                })
            }
            const jwt = await this.jwtService.signAsync({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            })
            return{
                ok: true,
                token: jwt
            }
        }catch (e: any){
            if(e instanceof UnauthorizedException){
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }

    @Get('user-info')
    async userInfo(@Req() request: Request){
        try{
            const data =
                await this.jwtService.verifyAsync(
                    request.get('x-token'));
            if (!data){
                throw new UnauthorizedException({
                    ok: false,
                    message: 'Token incorrecto'
                })
            }
            const user =
                await this.userService.findOne(
                    {email: data.email});

            return {
                ok: true,
                usuario: (({_id, username, email, avatar}) => ({
                    _id, username, email, avatar
                }))(user)
            }
        }catch (e) {
            if (e instanceof UnauthorizedException){
                throw e;
            }
            throw new InternalServerErrorException({
                ok: false,
                message: e.message
            })
        }
    }
}
