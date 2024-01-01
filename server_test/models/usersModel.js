import fs from 'fs'
import {filePath} from '../utils/dataFilePath.js'

const readDataFromFile = ()=>{
    try {
        const fileData = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(fileData)
    } catch (error) {
        throw new Error('Error reading from users array.')
    }
}

const writeDataToFile = (users) =>{
    try {
       fs.writeFileSync(filePath,JSON.stringify(users), 'utf-8') 
    } catch (error) {
        throw new Error('Error writing to the users file.')
    }
}

export {readDataFromFile, writeDataToFile}