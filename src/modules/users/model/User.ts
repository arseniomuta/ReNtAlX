import { randomUUID } from "node:crypto";

class User {
  id?: string;
  firs_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  password: string;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { User };
