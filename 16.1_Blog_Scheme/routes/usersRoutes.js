import  express  from "express";
import {createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/usersControllers.js'

const router = express.Router()

//Create new user

router.post('/users', createUser )

//Get all users

router.get('/users', getAllUsers)

// Get user by is ID

router.get('/users/:id', getUserById)

// Update User by is ID 

router.put('/users/:id', updateUser)

//Delete user by is ID 

router.delete('/users/:id', deleteUser)
export default router