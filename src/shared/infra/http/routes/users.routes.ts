import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/account/useCases/profileUserUseCase/ProfileUserController";

import uploadConfig from "../../../../config/update";
import { CreateUserController } from "../../../../modules/account/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.execute);

export { usersRoutes };
