import { STATUS_CODE } from "../constants/statuscodes.js";
import {
  readBookFromFile,
  writeBookToFile,
  fetchBooks,
} from "../models/bookModel.js";

export const getAllBooks = async (req, res, next) => {
  try {
    fetchBooks();
    const bookStore =readBookFromFile()
    res.status(STATUS_CODE.OK).send(bookStore);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};
// export const createBook = async (req, res, next) => {
//     try {
//       const bookStore = readBookFromFile();
//     if (bookStore.length != 0) {
//         console.log('ok!');

//         res.status(STATUS_CODE.OK).send(bookStore);
//     }
//     bookStore =fetchBooks()
//     writeBookToFile(bookStore);
//     res.send("creating new bookStore.json file");
//   } catch (error) {
//     res.status(STATUS_CODE.BAD_REQUEST);
//     next(error);
//   }
// };

export const getMovieByTitle = async (req, res, next) => {
  try {
    const bookTitle = req.params.movieTitle;
    const bookStore = readBookFromFile();
    const book = bookStore.find((b) => b.title.toLowerCase() === bookTitle.toLowerCase());
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(
        `there isnt a book goes by the title: '${bookStore}'. please try again.`
      );
    }
    res.status(STATUS_CODE.OK).send(book);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const bookStore = readBookFromFile();
    const bookIndex = bookStore.findIndex((book) => book.id === bookId);
   
    
    if (bookIndex === -1) {
      res.status(STATUS_CODE.NOT_FOUND);
      res.send(
        `no such id: (${bookId}) for a book it the store. please try again`
      );
    }
    ;
    bookStore.splice(bookIndex, 1)
    writeBookToFile(bookStore);
    res
      .status(STATUS_CODE.OK)
      .send(
        `the book with ID: ${bookId} as officialy remove from the book store.`
      )
      
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

export const updateBook = async (req, res, next) =>{
    try {
        const bookId = req.params.id;
        const {price, readingProgress} =req.body
        const bookStore = readBookFromFile();
        const book = bookStore.find((b)=>b.id === bookId)
        if(!book){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error('no such book with that id in the stor. please check again.')
        }
        book.price = price
        book.readingProgress = readingProgress
        writeBookToFile(bookStore)
        res.status(STATUS_CODE.OK).send(bookStore)
    } catch (error) {
        res.status(STATUS_CODE.BAD_REQUEST)
        next(error)
    }
}