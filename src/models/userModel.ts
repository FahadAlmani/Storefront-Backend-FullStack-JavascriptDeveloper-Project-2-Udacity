import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

const { PEPPER } = process.env;

export class userModel {
  register = async (user: User): Promise<User | null> => {
    const connection = await client.connect();

    const testSQL = `SELECT * FROM users WHERE userName = '${user.username}'`;
    const usernameTest = await connection.query(testSQL);

    if (!usernameTest.rows.length) {
      const hashedPassword = bcrypt.hashSync(user.password + PEPPER, 12);
      const SQL = `INSERT INTO users (firstName, lastName, userName, password) VALUES ('${user.firstname}', '${user.lastname}', '${user.username}', '${hashedPassword}') RETURNING *`;
      const result = await connection.query(SQL);
      connection.release();
      return result.rows[0];
    } else {
      return null;
    }
  };

  login = async (username: string, password: string): Promise<User | null> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await await connection.query(SQL);
    const user: User = result.rows[0];
    connection.release();

    if (bcrypt.compareSync(password + PEPPER, user.password)) {
      return user;
    } else {
      return null;
    }
  };

  index = async (): Promise<User[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM users`;
    const result = await connection.query(SQL);
    const users: User[] = result.rows;
    connection.release();
    return users;
  };

  show = async (id: number): Promise<User> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM users WHERE id = '${id}'`;
    const result = await connection.query(SQL);
    const user: User = result.rows[0];
    connection.release();
    return user;
  };
}
