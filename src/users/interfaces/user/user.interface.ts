export interface User extends Document{
    _id: string;
    username: string;
    avatar: string;
    email: string;
    password: string;
}
