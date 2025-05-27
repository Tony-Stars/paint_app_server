import { IUserSequenceService } from "./user-sequence-service";

export class UserSequenceController {
    private service: IUserSequenceService;

    public constructor(service: IUserSequenceService) {
        this.service = service;
    }
}
