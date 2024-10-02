const express = require("express")
const router = express.Router()
const User = require('../Models/userModel')


router.get('/', () => {})

    router.get('/', (req, res) => {
        res.json({msg: 'Get all users'})
    })
   
    router.get('/:id', (req, res) => {
        res.json({msg: 'Get a single user'})
    })

    router.post('/', async (req, res) => {
        const {name, id_no, acc_no, password} = req.body

        try{
            const user = await User.create({name, id_no, acc_no, password})

            res.status(200).json(user)
        }catch (error) {
            res.status(400).json({error: error.message})
        }
    })

    router.delete('/:id', (req, res) => {
        res.json({msg: 'Delete a user'})
    })

    router.patch('/:id', (req, res) => {
        res.json({msg: 'Update a user'})
    })

module.exports = router