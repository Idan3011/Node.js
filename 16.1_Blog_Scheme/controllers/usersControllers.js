import User from "../Models/users.js";
import STATUS_CODE from "../constants/statusCodes.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(STATUS_CODE.OK)
    res.send(user)
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) =>{
    try {
        const users = await User.find()
        if(!users){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('there are no users in this collaction.')

        }
        res.status(STATUS_CODE.OK)
        res.send(users)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}

export const getUserById = async (req, res, next) =>{
    try {
            const user = await User.findById(req.params.id)

            res.status(STATUS_CODE.OK).send(user)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}

export const updateUser = async (req, res, next) =>{
    try {
            const {name, address, email} = req.body
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
            res.status(STATUS_CODE.OK).send(user)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}

export const deleteUser = async (req, res ,next) =>{
    try {
            const user = await User.findByIdAndDelete(req.params.id)
            if(!user){
                res.status(STATUS_CODE.NOT_FOUND)
                throw new Error('no such user')
            }
            res.status(STATUS_CODE.OK).send(user)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}