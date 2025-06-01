import { IUser } from "./user";

export interface IUserResponse {
    id: number;
    username: string;
    login: string;
}

export function toUserResponse(user: IUser): IUserResponse {
    return {
        id: user.id,
        username: user.username,
        login: user.login, 
    };
}
