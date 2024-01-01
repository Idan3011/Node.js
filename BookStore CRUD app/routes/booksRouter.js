import express from 'express'
import {  deleteBook, getAllBooks ,getMovieByTitle, updateBook} from '../controllers/booksControllers.js'

// createBook,

const router = express.Router()


//Route to get all books

router.get('/', getAllBooks)

//Run's only once to get all books from mockAPI.
// router.get('/', createBook)

router.get('/title/:bookTitle', getMovieByTitle)

//Delete a movie from the store using is ID

router.delete('/delete/:id', deleteBook)

//Update existing Book 

router.put('/updateBook/:id', updateBook)
export default router