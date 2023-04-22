import { User } from "../../model/User";
import { ICreateUserCreateDTO, IUserRepositories } from "../IUserRepositories";

class UserRepositories implements IUserRepositories {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({
    first_name,
    last_name,
    avatar,
    email,
    password,
  }: ICreateUserCreateDTO): void {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): User {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

export { UserRepositories };
