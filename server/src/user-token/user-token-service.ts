import * as uuid from "uuid";
import { PaintDatabase } from "../paint-database";
import { IUserToken } from "./user-token";
import { IUserTokenCreateRequest, IUserTokenUpdateRequest } from "./user-token-request";

export interface IUserTokenService {
    create(request: IUserTokenCreateRequest): Promise<IUserToken>;
    read(id: number): Promise<IUserToken>;
    update(id: number, request: IUserTokenUpdateRequest): Promise<IUserToken>;
    delete(id: number): Promise<void>;
    generate(): string;
}

export class UserTokenService implements IUserTokenService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(request: IUserTokenCreateRequest): Promise<IUserToken> {
        const result = await this.database.query<IUserToken>(
            'insert into user_token (user_id, token, refresh_token, ttl) values ($1, $2, $3, $4) returning *',
            [request.userId, request.token, request.refreshToken, request.ttl],
        );
        const userToken = result.rows[0];
        return userToken;
    }

    public async read(id: number): Promise<IUserToken> {
        const result = await this.database.query<IUserToken>('select * from user_token where id = $1', [id]);
        const userToken = result.rows[0];
        return userToken;
    }

    public async update(id: number, request: IUserTokenUpdateRequest): Promise<IUserToken> {
        const result = await this.database.query<IUserToken>(
            'update user_token set token = $1, refresh_token = $2, ttl = $3 where id = $4 returning *',
            [request.token, request.refreshToken, request.ttl, id],
        );
        const userToken = result.rows[0];
        return userToken;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<IUserToken>('delete from user_token where id = $1', [id]);
    }

    public generate(): string {
        return uuid.v4();
    }
}
