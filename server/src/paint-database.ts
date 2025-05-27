import { Pool } from "pg";

export class PaintDatabase extends Pool {
    static create(): PaintDatabase {
        return new PaintDatabase({
            user: 'postgres',
            password: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'paint',
        });
    }
}
