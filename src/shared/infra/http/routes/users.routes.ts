import uploadConfig from "config/update";
import { Router } from "express";
import { CreateUserController } from "modules/account/useCases/createUser/CreateUserController";
import { ProfileUserController } from "modules/account/useCases/profileUserUseCase/ProfileUserController";
import { UpdateUserAvatarController } from "modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";

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
