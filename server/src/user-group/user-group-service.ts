import { PaintDatabase } from "../paint-database";
import { IUserGroup } from "./user-group";

export interface IUserGroupService {
    create(userId: number, groupId: number): Promise<IUserGroup>;
    read(id: number): Promise<IUserGroup>;
    delete(id: number): Promise<void>;
}

export class UserGroupService implements IUserGroupService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(userId: number, groupId: number): Promise<IUserGroup> {
        const result = await this.database.query<IUserGroup>(
            'insert into user_group (user_id, group_id) values ($1, $2) returning *',
            [userId, groupId],
        );
        const userGroup = result.rows[0];
        return userGroup;
    }

    public async read(id: number): Promise<IUserGroup> {
        const result = await this.database.query<IUserGroup>('select * from user_group where id = $1', [id]);
        const userGroup = result.rows[0];
        return userGroup;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<IUserGroup>('delete from user_group where id = $1', [id]);
    }
}
