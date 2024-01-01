import express from 'express'
import {getAllUsers, creatUser, getUserById} from '../controllers/usersControllers.js'
const router = express.Router()


//get all users

router.get('/', getAllUsers)

//Creat user

router.post('/', creatUser)

// Get user by ID
router.get('/:id', getUserById)
export default router

