import STATUS_CODE from "../constants/statusCodes.js";
import { readDataFromFile, writeDataToFile } from "../models/usersModel.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = (req, res, next) => {
  try {
    const users = readDataFromFile();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const creatUser = (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.send(STATUS_CODE.BAD_REQUEST);
      throw new Error("all fileds are requierd! (name, email)");
    }
    const users = readDataFromFile();

    console.log(users);

    if (users.some((u) => u.name === name)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A user with the same name already exists.");
    }

    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    writeDataToFile(users);
    res.status(STATUS_CODE.OK).send(newUser);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

export const getUserById = (req, res, next) =>{
    try {
        const userId  = req.params.id
        const users = readDataFromFile()
        const user = users.find((u)=>u.id === userId)
        if(!user){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error(`there is no user with ${userId} as ID. please try again.`)
        }
        res.send(user)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}

export const updateUser = (req, res, next) =>{
    try {
        const userId = req.params.id
        const {name, email} = req.body;
        
        const users = readDataFromFile()
        const user = users.find((u)=> u.id === userId)
        if(!user) {
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error(`no user with that id (${userId})`)
        }

        user = {...name, ...email}
        console.log(user);
        
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}