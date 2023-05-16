import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = randomUUID();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at,drive_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
  `);

  await connection.close();
}

create().then(() => console.log("User admin  created"));
