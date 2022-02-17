const {Router} = require('express');
const router = Router();
const Message = require('../models/Message');
const User = require('../models/User');
const check = require('express-validator');

router.post(
    '/sendmessage',

    async(req, res) => {

        try {

            const {headMsg, bodyMsg, auth, toUsers} = req.body;

            for (let i = 0; i < toUsers.length; i++) {
                const newMessage = Message({
                    from: auth.userID,
                    fromName: auth.userNAME,
                    fromEmail: auth.userEMAIL,
                    to: toUsers[i]._id,
                    toName: toUsers[i].name,
                    toEmail: toUsers[i].email,
                    headMsg, bodyMsg,
                    date: new Date().toLocaleString()
                });
                await newMessage.save();
            }

            res.status(201).json({message: 'Message sent.'});

        } catch(e) {
            // удалить
            console.log('ERROR: ' + e.message);
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

router.get(
    '/userslist',
    async(req, res) => {

        try {
            const usersList = await User.find();

            // Тут передается пароль, позже исправить
            res.json(usersList);

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

router.get(
    '/loadmessages',
    async(req, res) => {

        try {
            let messages = await Message.find({to: req.headers.authorization});

            res.json(messages);

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

router.get(
    '/sendmessages',
    async(req, res) => {

        try {
            let messages = await Message.find({from: req.headers.authorization});

            res.json(messages);

        } catch(e) {
            res.status(500).json({message: 'Something wrong. Try again.'});
        }
});

module.exports = router;