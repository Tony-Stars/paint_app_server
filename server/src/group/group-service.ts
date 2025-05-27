import { PaintDatabase } from "../paint-database";
import { IGroup } from "./group";

export interface IGroupService {
    create(leader: number): Promise<IGroup>;
    read(id: number): Promise<IGroup>;
    update(id: number, leader: number): Promise<IGroup>;
    delete(id: number): Promise<void>;

    first(): Promise<IGroup>;
}

export class GroupService implements IGroupService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(leader: number): Promise<IGroup> {
        const result = await this.database.query<IGroup>(
            'insert into "group" (leader) values ($1) returning *',
            [leader],
        );
        const group = result.rows[0];
        return group;
    }

    public async read(id: number): Promise<IGroup> {
        const result = await this.database.query<IGroup>('select * from "group" where id = $1', [id]);
        const group = result.rows[0];
        return group;
    }

    public async update(id: number, leader: number): Promise<IGroup> {
        const result = await this.database.query<IGroup>(
            'update "group" set leader = $1 where id = $2 returning *',
            [leader, id],
        );
        const group = result.rows[0];
        return group;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<IGroup>('delete from "group" where id = $1', [id]);
    }

    public async first(): Promise<IGroup> {
        const result = await this.database.query<IGroup>('select * from "group" limit 1');
        const group = result.rows[0];
        return group;
    }
}
