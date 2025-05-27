import { PaintDatabase } from "../paint-database";
import { ISequence } from "./sequence";

export interface ISequenceService {
    create(preview: string): Promise<ISequence>;
    read(id: number): Promise<ISequence>;
    update(id: number, preview: string): Promise<ISequence>;
    delete(id: number): Promise<void>;

    first(): Promise<ISequence>;
}

export class SequenceService implements ISequenceService {
    private database: PaintDatabase;

    public constructor(database: PaintDatabase) {
        this.database = database;
    }

    public async create(preview: string): Promise<ISequence> {
        const result = await this.database.query<ISequence>(
            'insert into "sequence" (preview) values ($1) returning *',
            [preview],
        );
        const sequence = result.rows[0];
        return sequence;
    }

    public async read(id: number): Promise<ISequence> {
        const result = await this.database.query<ISequence>('select * from "sequence" where id = $1', [id]);
        const sequence = result.rows[0];
        return sequence;
    }

    public async update(id: number, preview: string): Promise<ISequence> {
        const result = await this.database.query<ISequence>(
            'update "sequence" set preview = $1 where id = $2 returning *',
            [preview, id],
        );
        const sequence = result.rows[0];
        return sequence;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<ISequence>('delete from "sequence" where id = $1', [id]);
    }

    public async first(): Promise<ISequence> {
        const result = await this.database.query<ISequence>('select * from "sequence" limit 1');
        const sequence = result.rows[0];
        return sequence;
    }
}
