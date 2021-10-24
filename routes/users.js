import express from 'express';

const router = express.Router();

router.route('/')
.get((req, res ) => {
    res.send('check all users')
})
.post((req, res ) => {
    res.send('create user')
})

router.route('/:id')
.get((req, res) => {
    res.send('check single user')
})
.patch((req, res ) => {
    res.send('update single user')
})
.delete((req, res ) => {
    res.send('delete single user')
})


export default router