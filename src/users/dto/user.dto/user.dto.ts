import {IsEmail, IsString, Length} from "class-validator";

export class UserDto {
    @IsString()
    username: string;
    avatar: string;
    @IsEmail()
    email: string;
    @Length(6)
    password: string;
}
