import { PaintDatabase } from "../paint-database";
import { IYandexDiskService } from "../yandex-disk/yandex-disk-service";
import { ICanvas } from "./canvas";

export interface ICanvasService {
    create(link: string, sequenceId: number): Promise<ICanvas>;
    read(id: number): Promise<ICanvas>;
    update(id: number, link: string): Promise<ICanvas>;
    delete(id: number): Promise<void>;
}

export class CanvasService implements ICanvasService {
    private database: PaintDatabase;
    private yandexDiskService: IYandexDiskService;

    public constructor(database: PaintDatabase, yandexDiskService: IYandexDiskService) {
        this.database = database;
        this.yandexDiskService = yandexDiskService;
    }

    public async create(link: string, sequenceId: number): Promise<ICanvas> {
        const result = await this.database.query<ICanvas>(
            'insert into canvas (link, sequence_id) values ($1, $2) returning *',
            [link, sequenceId],
        );
        const canvas = result.rows[0];
        return canvas;
    }

    public async read(id: number): Promise<ICanvas> {
        const result = await this.database.query<ICanvas>('select * from canvas where id = $1', [id]);
        const canvas = result.rows[0];
        return canvas;
    }

    public async update(id: number, link: string): Promise<ICanvas> {
        const result = await this.database.query<ICanvas>(
            'update canvas set link = $1 where id = $2 returning *',
            [link, id],
        );
        const canvas = result.rows[0];
        return canvas;
    }

    public async delete(id: number): Promise<void> {
        await this.database.query<ICanvas>('delete from canvas where id = $1', [id]);
    }
}
