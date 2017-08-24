console.log('Starting app');

const fs = require('fs');

const notes = require('./notes.js')
const _ = require('lodash'); 
const yargs = require('yargs');

const  argv = yargs.argv;
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
    console.log('Listen all notes');
    notes.getAll();
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
