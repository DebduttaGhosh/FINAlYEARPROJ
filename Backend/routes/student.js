const express = require('express');
const router = express.Router();
const Student = require('../Models/student');


router.get('/test', (req, res) => {res.send("TEST")})

router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a student
router.post('/save', async (req, res) => {
    try {
        console.log(req.body)
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.json({savedStudent, msg : "SAVED"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit a student
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({updatedStudent, msg : "UPDATED"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        const Name = name;
        const students = await Student.find({ Name: { $regex: new RegExp(name, 'i') } });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/updateSubjects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Subject1, Subject2, Subject3, Subject4 } = req.body;
        console.log(Subject1)
        const updatedStudent = await Student.findByIdAndUpdate(id, {
            $set: {
                Subject1,
                Subject2,
                Subject3,
                Subject4
            }
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        console.log(updatedStudent)
        res.json({ updatedStudent, msg: 'Subjects updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
