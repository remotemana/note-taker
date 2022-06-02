const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        var notes = JSON.parse(data)
        console.log(notes)
        res.json(notes)
    })
});

router.post('/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        var notes = JSON.parse(data)
        var newNote = req.body
        newNote.id = uuidv4()
        notes.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
            res.json(req.body)

        })
    })
});

router.delete('/notes/:id', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        var notes = JSON.parse(data)
        var filterNotes = notes.filter((note) => note.id !== req.params.id)
        fs.writeFile("./db/db.json", JSON.stringify(filterNotes), (err, data) => {
            res.json(filterNotes)

        })
    })
});



module.exports = router