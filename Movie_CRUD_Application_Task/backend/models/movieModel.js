import fs from 'fs'
import { fileToPath } from '../utils/dataFilePath.js'

const readMoviesFromFile = () =>{
    try {
        const fileData = fs.readFileSync(fileToPath, 'utf-8')
        return JSON.parse(fileData)
    } catch (error) {
        throw new Error('Error reading from movie file')
    }
}
const writeMoviesToFile = (movies) =>{
    try {
        fs.writeFileSync(fileToPath,JSON.stringify(movies), 'utf-8')
    } catch (error) {
        throw new Error('Error writing to the movies file')
    }
}


export {readMoviesFromFile, writeMoviesToFile}