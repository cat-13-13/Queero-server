const { verifyToken } = require("../middlewares/verifyToken")
const Message = require("../models/Message.model")
const router = require("express").Router()

router.get('/', (req, res, next) => {



    Message
        .find()
        .sort({ createdAt: -1 })
        .limit(20)
        .populate('owner', 'name')
        .then(messages => res.json(messages))
        .catch(err => next(err))

})


router.post('/create', verifyToken, (req, res, next) => {

    const { message } = req.body;
    const { _id: owner } = req.payload;

    Message.countDocuments({ owner })
        .then((messageCount) => {
            if (messageCount >= 20) {
                return Message.find({ owner })
                    .sort({ createdAt: 1 })
                    .limit(messageCount - 19)
                    .then((messagesToDelete) => {
                        const deletePromises = messagesToDelete.map((messageToDelete) => {
                            return messageToDelete.deleteOne();
                        });
                        return Promise.all(deletePromises);
                    })
                    .then(() => {
                        return Message.create({ owner, message });
                    });
            } else {
                return Message.create({ owner, message });
            }
        })
        .then((createdMessage) => {
            res.json(createdMessage);
        })
        .catch((err) => {
            next(err);
        });
});



router.delete('/delete', verifyToken, (req, res, next) => {


})



module.exports = router
