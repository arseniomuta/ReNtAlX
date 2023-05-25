import { Router } from "express";

import { RefreshTokenController } from "@modules/account/useCases/refreshToken/RefreshTokenController";

import { AuthenticateUserController } from "../../../../modules/account/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
