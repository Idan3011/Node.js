const fs = require('fs')

// fs.writeFileSync('notes.txt', 'My name is Idan!');
//  try {
//     // fs.appendFileSync('notes.txt', 'this is  append text to notes.txt')
//     // fs.copyFileSync('notes.txt', 'notes_copy.text')
//     // fs.renameSync('notes.txt', 'new_notes.txt')
   
//  } catch (error) {
//     console.error(error)
//  }

 const getFile = (dir, files= [])=>{
    const fileList = fs.readdirSync(dir)

    for(const file of fileList){
        const name = `${dir}/${file}`

    if(fs.statSync(name).isDirectory()){
        getFile(name, files)
    } else{
        files.push(name)
    }
    }
    console.log(files)
 }

 const filesInDir = getFile('Node')
 console.log(filesInDir);
 