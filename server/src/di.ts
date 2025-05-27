import { AuthController } from "./auth/auth-controller";
import { CanvasController } from "./canvas/canvas-controller";
import { CanvasService, ICanvasService } from "./canvas/canvas-service";
import { Controller } from "./controller";
import { GroupController } from "./group/group-controller";
import { GroupService, IGroupService } from "./group/group-service";
import { PaintDatabase } from "./paint-database";
import { SequenceController } from "./sequence/sequence-controller";
import { ISequenceService, SequenceService } from "./sequence/sequence-service";
import { Service } from "./service";
import { UserGroupController } from "./user-group/user-group-controller";
import { IUserGroupService, UserGroupService } from "./user-group/user-group-service";
import { UserSequenceController } from "./user-sequence/user-sequence-controller";
import { IUserSequenceService, UserSequenceService } from "./user-sequence/user-sequence-service";
import { UserTokenController } from "./user-token/user-token-controller";
import { IUserTokenService, UserTokenService } from "./user-token/user-token-service";
import { UserController } from "./user/user-controller";
import { IUserService, UserService } from "./user/user-service";
import { YandexDiskIntegration } from "./yandex-disk";
import { IYandexDiskService, YandexDiskService } from "./yandex-disk/yandex-disk-service";

export class DI {
    private _yandexDiskService?: IYandexDiskService;

    private _canvasService?: ICanvasService;
    private _groupService?: IGroupService;
    private _sequenceService?: ISequenceService;
    private _userService?: IUserService;
    private _userGroupService?: IUserGroupService;
    private _userSequenceService?: IUserSequenceService;
    private _userTokenService?: IUserTokenService;

    private _authController?: AuthController;
    private _canvasController?: CanvasController;
    private _groupController?: GroupController;
    private _sequenceController?: SequenceController;
    private _userController?: UserController;
    private _userGroupController?: UserGroupController;
    private _userSequenceController?: UserSequenceController;
    private _userTokenController?: UserTokenController;

    private _service?: Service;
    private _controller?: Controller;

    public init(): void {
        const database = PaintDatabase.create();

        const yandexDiskService = new YandexDiskService();

        const canvasService = new CanvasService(database, yandexDiskService);
        const groupService = new GroupService(database);
        const sequenceService = new SequenceService(database);
        const userService = new UserService(database);
        const userGroupService = new UserGroupService(database);
        const userSequenceService = new UserSequenceService(database);
        const userTokenService = new UserTokenService(database);

        this._canvasService = canvasService;
        this._groupService = groupService;
        this._sequenceService = sequenceService;
        this._userService = userService;
        this._userGroupService = userGroupService;
        this._userSequenceService = userSequenceService;
        this._userTokenService = userTokenService;

        this._authController = new AuthController(userService, userTokenService);
        this._canvasController = new CanvasController(canvasService);
        this._groupController = new GroupController(groupService);
        this._sequenceController = new SequenceController(sequenceService);
        this._userController = new UserController(userService);
        this._userGroupController = new UserGroupController(userGroupService);
        this._userSequenceController = new UserSequenceController(userSequenceService);
        this._userTokenController = new UserTokenController(userTokenService);

        const service = new Service();
        const yandexDiskIntegration = new YandexDiskIntegration();
        this._service = service;
        this._controller = new Controller(service, yandexDiskIntegration);
    }

    public get yandexDiskService(): IYandexDiskService {
        return this._yandexDiskService as IYandexDiskService;
    }

    public get canvasService(): ICanvasService {
        return this._canvasService as ICanvasService;
    }

    public get groupService(): IGroupService {
        return this._groupService as IGroupService;
    }

    public get sequenceService(): ISequenceService {
        return this._sequenceService as ISequenceService;
    }

    public get userService(): IUserService {
        return this._userService as IUserService;
    }

    public get userGroupService(): IUserGroupService {
        return this._userGroupService as IUserGroupService;
    }

    public get userSequenceService(): IUserSequenceService {
        return this._userSequenceService as IUserSequenceService;
    }

    public get userTokenService(): IUserTokenService {
        return this._userTokenService as IUserTokenService;
    }

    public get authController(): AuthController {
        return this._authController as AuthController;
    }

    public get canvasController(): CanvasController {
        return this._canvasController as CanvasController;
    }

    public get groupController(): GroupController {
        return this._groupController as GroupController;
    }

    public get sequenceController(): SequenceController {
        return this._sequenceController as SequenceController;
    }

    public get userController(): UserController {
        return this._userController as UserController;
    }

    public get userGroupController(): UserGroupController {
        return this._userGroupController as UserGroupController;
    }

    public get userSequenceController(): UserSequenceController {
        return this._userSequenceController as UserSequenceController;
    }

    public get userTokenController(): UserTokenController {
        return this._userTokenController as UserTokenController;
    }

    public get service(): Service {
        return this._service as Service; // TODO delete
    }

    public get controller(): Controller {
        return this._controller as Controller; // TODO delete
    }
}
