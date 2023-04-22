import { User } from "../model/User";

interface ICreateUserCreateDTO {
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
  password: string;
}

interface IUserRepositories {
  create({
    first_name,
    last_name,
    avatar,
    email,
    password,
  }: ICreateUserCreateDTO): void;
  findByEmail(email: string): User;
}

export { IUserRepositories, ICreateUserCreateDTO };
