import { PaintDatabase } from "../paint-database";
import { IUser } from "./user";
import { IUserRequest } from "./user-request";

export interface IUserService {
    create(request: IUserRequest): Promise<IUser>;
    read(id?: number, email?: string): Promise<IUser | undefined>;
    update(id: number, request: IUserRequest): Promise<IUser>;
    delete(id: number): Promise<void>;

    first(): Promise<IUser>;
}

export class UserService implements IUserService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(request: IUserRequest): Promise<IUser> {
        const result = await this.database.query<IUser>(
            'insert into "user" (name, surname, email, password) values ($1, $2, $3, $4) returning *',
            [request.name, request.surname, request.email, request.password],
        );
        return result.rows[0];
    }

    public async read(id?: number, email?: string): Promise<IUser | undefined> {
        if (id && email) {
            const result = await this.database.query<IUser>('select * from "user" where id = $1 and email = $2', [id, email]);
            return result.rows[0];
        } else if (id && !email) {
            const result = await this.database.query<IUser>('select * from "user" where id = $1', [id]);
            return result.rows[0];
        } else if (!id && email) {
            const result = await this.database.query<IUser>('select * from "user" where email = $1', [email]);
            return result.rows[0];
        } else {
            throw Error('Отсутствуют параметры запроса');
        }
    }

    public async update(id: number, request: IUserRequest): Promise<IUser> {
        const result = await this.database.query<IUser>(
            'update "user" set name = $1, surname = $2, email = $3, password = $4 where id = $5 returning *',
            [request.name, request.surname, request.email, request.password, id],
        );
        return result.rows[0];
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<IUser>('delete from "user" where id = $1', [id]);
    }

    public async first(): Promise<IUser> {
        const result = await this.database.query<IUser>('select * from "user" limit 1');
        return result.rows[0];
    }
}
