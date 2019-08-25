const fs = require('fs');
const chalk = require('chalk')

const successStyle = chalk.bgGreen.black
const errorStyle = chalk.bgRed.black
const displayStyle = chalk.green.bold

// Adding note
const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.filter((note) => {
        return note.title === title
    })

    if(duplicateNote.length === 0) {
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(successStyle('Note Added!'))
    } else {
        console.log(errorStyle('Note Title Already Exist!'))
    } 
}

const loadNotes = () => {
    try {
        const readFromFile = fs.readFileSync('notes.json').toString()
        return JSON.parse(readFromFile)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Remove notes
const removeNotes = (title) => {
    const notes = loadNotes()
    const keepNotes = notes.filter((note) => {
        return note.title !== title
    })
    if(notes.length > keepNotes.length) {
        console.log(successStyle('Note Removed!'))
        saveNotes(keepNotes)
    } else {
        console.log(errorStyle('Note Not Found!'))
    }
}

// Lists all notes
const listsNotes = () => {
    const notes = loadNotes()
    notes.filter((note, index) => {
        return console.log(displayStyle(`${index + 1} - ${note.title}`))
    })
}

// Read specific note
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)

    if(note) {
        console.log(displayStyle(`Title : ${note.title}\n Body : ${note.body}`))
    } else {
        console.log(errorStyle('Title Not Found!'))
    }
}

module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listsNotes : listsNotes,
    readNote : readNote
}