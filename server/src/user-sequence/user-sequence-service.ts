import { PaintDatabase } from "../paint-database";
import { IUserSequence } from "./user-sequence";

export interface IUserSequenceService {
    create(userId: number, sequenceId: number): Promise<IUserSequence>;
    read(id: number): Promise<IUserSequence>;
    delete(id: number): Promise<void>;
}

export class UserSequenceService implements IUserSequenceService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(userId: number, sequenceId: number): Promise<IUserSequence> {
        const result = await this.database.query<IUserSequence>(
            'insert into user_sequence (user_id, sequence_id) values ($1, $2) returning *',
            [userId, sequenceId],
        );
        const userSequence = result.rows[0];
        return userSequence;
    }

    public async read(id: number): Promise<IUserSequence> {
        const result = await this.database.query<IUserSequence>('select * from user_sequence where id = $1', [id]);
        const userSequence = result.rows[0];
        return userSequence;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<IUserSequence>('delete from user_sequence where id = $1', [id]);
    }
}
