import fs from "fs";
import { filePath } from "../utils/filePath.js";
import axios from "../data/booksAPI.js";

const readBookFromFile =()=>{
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(fileData)
    } catch (error) {
        throw new Error('Error reading from file')
    }
}

const writeBookToFile = (books) =>{
    try {
        fs.writeFileSync(filePath,JSON.stringify(books), 'utf-8')
    } catch (error) {
        throw new Error('Error write book  to file')
    }
}

const fetchBooks =async ()=>{
    try {
        const res = await axios.get('/EBookStore')
        const books = res.data
        fs.writeFileSync(filePath, JSON.stringify(books), 'utf-8')
        
    } catch (error) {
        throw new Error('cant reach Server.')
    }
}


export {readBookFromFile, writeBookToFile, fetchBooks}