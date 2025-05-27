import { IUserRequest } from "./user-request";
import { IUserService } from "./user-service";

export class UserController {
    private service: IUserService;

    public constructor(service: IUserService) {
        this.service = service;
    }

    public async get(req: any, res: any): Promise<void> {
        try {
            const id = req.query.id as number | undefined;
            const email = req.query.email as string | undefined;
            const user = await this.service.read(id, email);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при получении пользователя', error: e });
        }
    }

    public async update(req: any, res: any): Promise<void> {
        try {
            const id = req.params.id as number;
            const request = req.body as IUserRequest;
            const user = await this.service.update(id, request);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при изменении пользователя', error: e });
        }
    }

    public async delete(req: any, res: any): Promise<void> {
        try {
            const id = req.params.id as number;
            await this.service.delete(id);
            return res.status(200).json({ result: 'Deleted' });
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при удалении пользователя', error: e });
        }
    }
}
