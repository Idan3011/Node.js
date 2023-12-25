import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
import uniqid from "uniqid";
import yargs from "yargs";

const users = {
  name: "Idan",
  email: "idanrot20@gmail.com",
  id: uniqid(),
};

const getUsers = function () {
  return "Users list...";
};
const addUser = function (name, email) {
  const users = loadUsers();
  const duplicatsUser = users.find((user) => {
    user.email == email;
  });
  if (!duplicatsUser) {
    users.push({
      id: uniqid(),
      name,
      email,
    });
    saveUsers(users);
    console.log(chalk.green.inverse("new user added"));
  } else {
    console.log(
      chalk.red.inverse(
        `${email} is all ready in use. please insert a new email`
      )
    );
  }
};

const saveUsers = function (users) {
  const dataJSON = JSON.stringify(users);
  writeFileSync("users.json", dataJSON);
};
const loadUsers = function () {
  try {
    const dataBaffer = readFileSync("users.json");
    const dataJSON = dataBaffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const reamoveUser = function (name) {
  const users = loadUsers();
  const duplicateUsers = users.filter((user) => {
    return user.name !== name;
  });
  if (users.length > duplicateUsers.length) {
    saveUsers(duplicateUsers);
    console.log(chalk.green.inverse("user removed!"));
  } else {
    console.log(chalk.red.inverse(`no such user: `, name));
  }
};

const listUsers = () => {
  const users = loadUsers();
  console.log(chalk.inverse("Your Users"));

  users.forEach((user) => {
    console.log(user);
  });
};

const readUser = (name) => {
  const users = loadUsers();
  const findUser = users.find((user) => user.name === name);
    if(findUser){
      console.log(chalk.green.inverse('the user you looking for is: ', findUser.name , findUser.email));
      
    } else{
      console.log(chalk.red.inverse('no such user goes by the name: ', name));
      
    }

};
const argv = yargs(process.argv.slice(2))
  .command({
    command: "add",
    describe: "Add user",
    builder: {
      name: {
        describe: "user name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "user Email",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      addUser(argv.name, argv.email);
    },
  })
  .command({
    command: "remove",
    describe: "Remove user",
    builder: {
      name: {
        describe: "User Name",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      reamoveUser(argv.name);
    },
  })
  .command({
    command: "read",
    describe: "list all users",
    builder: {
      name: {
        describe: "User Name",
        demandOption: true,
        type: "string",
      },
    },
    handler: function (argv) {
      readUser(argv.name);
    },
  })
  .command({
    command: "list",
    describe: "list users",
    handler: function () {
      listUsers();
    },
  })
  .parse();
