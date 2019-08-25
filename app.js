const yargs = require('yargs')
const chalk = require('chalk')
const notes = require('./notes')

// command for add a new note
yargs.command({
    command : 'add',
    describe : 'add a new note',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : String
        },
        body : {
            describe : 'Note body',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => {
       notes.addNotes(argv.title, argv.body)
    }
});

yargs.command({
    command : 'remove',
    describe : 'remove an existing note',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => {
        notes.removeNotes(argv.title)
    }
});

// read a note 
yargs.command({
    command : 'read',
    describe : 'read note',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true,
            type : String
        }
    },
    handler : (argv) => {
        notes.readNote(argv.title)
    }
});

// lists all the notes
yargs.command({
    command : 'list',
    describe : 'list all notes',
    handler : () => {
        notes.listsNotes()
    }
})

yargs.parse();