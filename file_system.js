const fs = require('fs')
const getNotes = require('./node_vs_js')
const chalk = require('chalk')
const yargs = require('yargs')


// const validator = require('validator')
// fs.writeFileSync('notes.txt', 'My name is Idan!');
//  try {
//     // fs.appendFileSync('notes.txt', 'this is  append text to notes.txt')
//     // fs.copyFileSync('notes.txt', 'notes_copy.text')
//     // fs.renameSync('notes.txt', 'new_notes.txt')
   
//  } catch (error) {
//     console.error(error)
//  }

// const testFolder = '../Node/'
// const fileList = []
// fs.readdirSync(testFolder, {withFileTypes: true})
// .filter(item => !item.isDirectory())
// .map(item => fileList.push(item.name))
 
//   console.log(fileList);
  
// const getNote = getNotes()

// console.log(getNote);

// console.log(validator.isURL('sdfsdf'));

// console.log(chalk.bgGreen.bold('Success'));



yargs.version('1.1.0')

//create add commend

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },

        body: {
            describe: 'write a paragraph',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
       console.log('Title: ', argv.title);
       console.log('Body: ', argv.body);
       
        
    }
})

// create Remove Commend

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function (){
        console.log('Remove the note');
        
    }
})

// create List Command

yargs.command({
    command: 'list',
    describe: 'adding a list',
    handler: function (){
        console.log('this list was added!');
        
    }
})

// create read command

yargs.command({
    command: 'read',
    describe: 'reading files',
    handler:function (){
        console.log('read this file!');
        
    }
})

yargs.parse()
