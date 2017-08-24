console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return  JSON.parse(noteString);
    }catch (e){
        return [];
    }    
}

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };


    
    //check duplications string.
    var duplicatNotes = notes.filter((note) => note.title === title); 

    if (duplicatNotes.length === 0 ){
        notes.push(note);
        //write to json file
        saveNote(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
}   
    

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
}

var removeNote = (title) => {
    //fetch notes
    var notes = fetchNotes();
    
    //filter notes, removing the one with title of argument
    var filteredNotes = notes.filter((note) => note.title !== title );
    
    // Save new notes array
    saveNote(filteredNotes);
    return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
;}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}; 