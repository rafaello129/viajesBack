

import { Router } from "express";
import { AuthDatasourceImpl } from "../../infrastructure/datasources";
import { AuthRepositoryImpl } from "../../infrastructure/repositories";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const authDataSource = new AuthDatasourceImpl();

        const authRepository = new AuthRepositoryImpl( authDataSource );

        const controller = new AuthController( authRepository );

        router.post('/login/:role', controller.login );
        router.post('/register/:role', controller.register );
        router.get('/renew', [ AuthMiddleware.validateJwt ], controller.renew );

        return router;
    }


}