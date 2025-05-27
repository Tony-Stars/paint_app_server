import { IUserTokenService } from "./user-token-service";

export class UserTokenController {
    private service: IUserTokenService;

    public constructor(service: IUserTokenService) {
        this.service = service;
    }
}
