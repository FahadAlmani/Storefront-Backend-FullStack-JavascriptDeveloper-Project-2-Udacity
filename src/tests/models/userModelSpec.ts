import client from "../../database";
import { User, userModel } from "../../models/userModel";

const model = new userModel();
const userTestCase: User = {
  id: 1,
  firstname: "Fahad",
  lastname: "Almani",
  username: "FHD",
  password: "123",
};

const newUser: User = {
  firstname: "test",
  lastname: "test",
  username: "test",
  password: "test",
};

describe("Testing User Model.", () => {
  beforeAll(async () => {
    const connection = await client.connect();
    const SQL = "DELETE FROM users WHERE id = 2";
    await connection.query(SQL);
    connection.release();
  });

  it("[Testing]: login function checks user password of the user.", async () => {
    const user: User | null = (await model.login(
      userTestCase.username,
      userTestCase.password
    )) as User;

    const { firstname, lastname, username } = user;
    expect({
      firstname,
      lastname,
      username,
    }).toEqual({
      firstname: userTestCase.firstname,
      lastname: userTestCase.lastname,
      username: userTestCase.username,
    });
  });

  it("[Testing]: index function returns all user.", async () => {
    const user: User[] = await model.index();

    expect([
      {
        firstname: user[0].firstname,
        lastname: user[0].lastname,
        username: user[0].username,
      },
    ]).toEqual([
      {
        firstname: userTestCase.firstname,
        lastname: userTestCase.lastname,
        username: userTestCase.username,
      },
    ]);
  });

  it("[Testing]: show function returns the user with specific id.", async () => {
    const user: User = await model.show(userTestCase.id as number);
    const { firstname, lastname, username } = user;
    expect({ firstname, lastname, username }).toEqual({
      firstname: userTestCase.firstname,
      lastname: userTestCase.lastname,
      username: userTestCase.username,
    });
  });

  it("[Testing]: register function creates user.", async () => {
    const user: User | null = (await model.register(newUser)) as User;
    const { firstname, lastname, username } = user;
    expect({
      firstname,
      lastname,
      username,
    }).toEqual({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
    });
  });

  it("[Testing]: register function don't create user already exist.", async () => {
    const user: User | null = await model.register(newUser);

    expect(user).toBeNull();
  });
});
