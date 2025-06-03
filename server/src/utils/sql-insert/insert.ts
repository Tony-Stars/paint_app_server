import { DI } from "../../di";


export async function insertAll(di: DI) {
    await insertSequence(di, 100);
    console.log('Создано 100 sequence');
    await insertUser(di, 100);
    console.log('Создано 100 user');
    await insertGroup(di, 100);
    console.log('Создано 100 group');
    await insertCanvas(di, 100);
    console.log('Создано 100 canvas');
    await insertUserSequence(di, 100);
    console.log('Создано 100 user sequence');
    await insertUserGroup(di, 100);
    console.log('Создано 100 user group');
    await insertUserToken(di, 100);
    console.log('Создано 100 user token');
}


async function insertSequence(di: DI, count: number) {
    const service = di.sequenceService;
    for (let index = 0; index < count; index++) {
        await service.create('sequence' + index);
    }
}

async function insertUser(di: DI, count: number) {
    const service = di.userService;
    for (let index = 0; index < count; index++) {
        await service.create({
            username: 'name' + index,
            login: 'login' + index,
            password: 'password' + index,
        });
    }
}

async function insertGroup(di: DI, count: number) {
    const service = di.groupService;
    const leader = await di.userService.first();
    for (let index = 0; index < count; index++) {
        await service.create(leader.id);
    }
}

async function insertCanvas(di: DI, count: number) {
    const service = di.canvasService;
    const sequence = await di.sequenceService.first();
    for (let index = 0; index < count; index++) {
        await service.create('link' + index, sequence.id);
    }
}

async function insertUserSequence(di: DI, count: number) {
    const service = di.userSequenceService;
    const sequence = await di.sequenceService.first();
    const user = await di.userService.first();
    for (let index = 0; index < count; index++) {
        await service.create(user.id, sequence.id);
    }
}

async function insertUserGroup(di: DI, count: number) {
    const service = di.userGroupService;
    const group = await di.groupService.first();
    const user = await di.userService.first();
    for (let index = 0; index < count; index++) {
        await service.create(user.id, group.id);
    }
}

async function insertUserToken(di: DI, count: number) {
    const service = di.userTokenService;
    const user = await di.userService.first();
    for (let index = 0; index < count; index++) {
        await service.create({
            token: 'token' + index,
            refreshToken: 'refreshToken' + index,
            ttl: 3600,
            userId: user.id,
        });
    }
}
