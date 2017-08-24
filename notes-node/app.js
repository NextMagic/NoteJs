console.log('Starting app');

const fs = require('fs');

const notes = require('./notes.js')
const _ = require('lodash'); 
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias :  't'
};

const bodyOpetions ={
    describe: 'Body of note',
    demand: true,
    alias : 'b'    
};
const  argv = yargs
              .command('add','Add a new note', {
                title: titleOptions,
                body: bodyOpetions
              })
              .command('list', 'List all notes')
              .command('read' , 'Read a Notes',{
                title: titleOptions
              })
              .command('remove','Remove a note', {
                  title: titleOptions
              })
              .help()          
              .argv;
var command = argv._[0]

console.log('Commnad: ',command);
console.log(process.argv);
console.log(argv);

if(command === 'add'){
    var note  = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if(command === 'list'){
    
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
    
} else if (command === 'read'){
    console.log('Reading notes');
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    console.log('remove note');
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log ('Command note found');
}
