import { ISequenceService } from "./sequence-service";

export class SequenceController {
    private service: ISequenceService;

    public constructor(service: ISequenceService) {
        this.service = service;
    }
}
