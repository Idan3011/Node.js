import express from 'express'
import { commentOnPost, createBlogPost } from '../controllers/blogControllers.js'
const router = express.Router()

//Create new blog POST
router.post('/blog/:id', createBlogPost)

//Comment on post by post id

router.put('/blog/:id', commentOnPost)

export default router