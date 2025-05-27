import { ICanvasService } from "./canvas-service";

export class CanvasController {
    private service: ICanvasService;

    public constructor(service: ICanvasService) {
        this.service = service;
    }
}
