import { IUserGroupService } from "./user-group-service";

export class UserGroupController {
    private service: IUserGroupService;

    public constructor(service: IUserGroupService) {
        this.service = service;
    }
}
