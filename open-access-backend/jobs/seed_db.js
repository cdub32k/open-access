import DB from "../database";

Promise.all([
  DB.UserModel.create({
    username: "member",
    email: "member@mail.com",
    passwordHash: "jkfd489tu894phpfc78v",
  }),
]).then(DB.disconnect);
