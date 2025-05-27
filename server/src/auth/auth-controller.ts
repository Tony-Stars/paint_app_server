import { IUserTokenService } from "../user-token/user-token-service";
import { IUserRequest } from "../user/user-request";
import { toUserResponse } from "../user/user-response";
import { IUserService } from "../user/user-service";
import { ILoginDto } from "./auth";

export class AuthController {
    private userService: IUserService;
    private userTokenService: IUserTokenService;

    public constructor(userService: IUserService, userTokenService: IUserTokenService) {
        this.userService = userService;
        this.userTokenService = userTokenService;
    }

    public async login(req: any, res: any): Promise<void> {
        try {
            const request = req.body as ILoginDto;
            const user = await this.userService.read(undefined, request.email);
            const token = this.userTokenService.generate();
            console.log(token);
            if (user?.password === request.password) {
                return res.status(200).json(toUserResponse(user));
            }

            return res.status(400).json({ message: 'Некорректные данные' });
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при авторизации', error: e });
        }
    }

    public async register(req: any, res: any): Promise<void> {
        try {
            const request = req.body as IUserRequest;
            const user = await this.userService.read(undefined, request.email);
            if (user) {
                return res.status(400).json({ message: `Пользователь с email ${user.email} уже существуют` });
            }

            const result = await this.userService.create(request);
            return res.status(200).json(toUserResponse(result));
        } catch (e) {
            return res.status(500).json({ message: 'Ошибка при регистрации', error: e });
        }
    }
}
