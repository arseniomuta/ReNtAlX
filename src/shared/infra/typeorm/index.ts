// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
