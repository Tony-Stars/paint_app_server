import { IGroupService } from "./group-service";

export class GroupController {
    private service: IGroupService;

    public constructor(service: IGroupService) {
        this.service = service;
    }
}
