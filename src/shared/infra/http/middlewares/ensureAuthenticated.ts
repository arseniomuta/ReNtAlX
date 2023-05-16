import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/account/infra/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  console.log(token);

  try {
    const { sub: user_id } = verify(
      token,
      "b7a4df21f847b04dc8459d6c93bc0580"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
