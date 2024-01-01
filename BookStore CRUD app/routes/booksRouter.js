import express from 'express'
import {  deleteBook, getAllBooks ,getBookByTitle, updateBook, getbookById, searchBook, sortByRealeseYear,getBooksByPrice } from '../controllers/booksControllers.js'

// createBook,

const router = express.Router()


//Route to get all books

router.get('/', getAllBooks)

//Run's only once to get all books from mockAPI.
// router.get('/', createBook)

router.get('/title/:bookTitle', getBookByTitle)

//Get Book by is ID

router.get('/id/:id', getbookById)

//Delete a Book from the store using is ID

router.delete('/delete/:id', deleteBook)

//Update existing Book 

router.put('/updateBook/:id', updateBook)

//search books by Genre/Title/Author

router.get('/booksearch/:search', searchBook)

//Sort by RealeseYear

router.get('/sort', sortByRealeseYear)

//sort books by Price

router.get('/price', getBooksByPrice)
export default router