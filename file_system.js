const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Idan!');
//  try {
//     // fs.appendFileSync('notes.txt', 'this is  append text to notes.txt')
//     // fs.copyFileSync('notes.txt', 'notes_copy.text')
//     // fs.renameSync('notes.txt', 'new_notes.txt')
   
//  } catch (error) {
//     console.error(error)
//  }

const testFolder = '../Node/'
const fileList = []
fs.readdirSync(testFolder, {withFileTypes: true})
.filter(item => !item.isDirectory())
.map(item => fileList.push(item.name))
 
  console.log(fileList);
  
