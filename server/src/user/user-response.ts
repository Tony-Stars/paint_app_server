import { IUser } from "./user";

export interface IUserResponse {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export function toUserResponse(user: IUser): IUserResponse {
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
    };
}
