import { Router } from "express";
import { DI } from "./di";

export function makeRouter(di: DI): Router {
    const controller = di.controller;
    const userController = di.userController;
    const authController = di.authController;

    const router: Router = Router();
    router.get('/image', controller.getImage.bind(controller));
    router.post('/image', controller.postImage.bind(controller));
    router.get('/sequence', controller.getSequence.bind(controller));
    router.post('/sequence', controller.postSequence.bind(controller));
    router.put('/sequence', controller.putSequence.bind(controller));
    router.post('/yandex', controller.yandex.bind(controller));

    router.get('/user', userController.get.bind(userController));
    router.put('/user/:id', userController.update.bind(userController));
    router.delete('/user/:id', userController.delete.bind(userController));

    router.post('/login', authController.login.bind(authController));
    router.post('/register', authController.register.bind(authController));
    return router;
}

