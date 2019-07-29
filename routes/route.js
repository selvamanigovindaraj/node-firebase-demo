const express = require('express');
const router = require('express').Router();
const _ = require('lodash');
const db = require('../startup/db').db
router.get('/', async (req, res, next) => {
    try {
        const studentSnapshot = await db.collection('student').get();
        const students = [];
        studentSnapshot.forEach((doc) => {
            students.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(students);
    } catch(e) { 
        next(e);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        const student = await db.collection('student').doc(id).get();
        if (!student.exists) {
            throw new Error('note does not exists');
        }
        res.json({
            id: student.id,
            data: student.data()
        });
    } catch(e) {
        next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let data = {}
        data.father_name = req.body.father_name;
        data.student_name = req.body.student_name;
        data.student_school = req.body.student_school;
        if (!data) throw new Error('Text is blank');
        const ref = await db.collection('student').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch(e) {
        next(e);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = _.pick(req.body,['father_name','student_name','student_school'])
        if (!id) throw new Error('id is blank');
        console.log(req.body)
        const ref = await db.collection('notes').doc(id).set( data, { merge: true });
        res.json({
            id,
            data
        });
    } catch(e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        await db.collection('student').doc(id).delete();
        res.json({
            id
        });
    } catch(e) {
        next(e);
    }
});

module.exports= router;