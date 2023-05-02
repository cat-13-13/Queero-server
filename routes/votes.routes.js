const router = require("express").Router()
const Vote = require("../models/Vote.model")
const Country = require('../models/Country.model')
const Post = require('../models/Post.model')
const { verifyToken } = require("../middlewares/verifyToken")
const { getScore } = require("../utils/getScore")


router.get('/:type/:id', (req, res, next) => {
    const { type, id } = req.params

    const getPageScore = model => {

        return model.findById(id)
            .select({ votes: 1 })
            .populate("votes", 'vote')
            .then(({ votes }) => getScore(votes))
            .then(result => res.json(result))
            .catch(err => next(err))
    }

    return type === 'COUNTRY' ? getPageScore(Country) : getPageScore(Post)

})

router.post('/:type/:id/create', verifyToken, (req, res, next) => {

    const { id, type } = req.params
    const { _id: owner } = req.payload
    const { vote } = req.body

    const createVote = (type) => {

        return type.findById(id)
            .populate("votes")
            .select({ votes: 1 })
            .then(({ votes }) => {
                const haveVoted = votes.filter(({ owner: ownerID }) => owner == ownerID)
                if (haveVoted.length) {
                    return Vote.findByIdAndUpdate(haveVoted[0]._id, { vote });
                } else {
                    return Vote.create({ vote, owner });
                }
            })
            .then((newVote) => {
                return type.findByIdAndUpdate(
                    id,
                    { $addToSet: { votes: newVote._id } },
                    { unique: true }
                );
            })
            .then(result => res.json(result))
            .catch(err => next(err))
    }

    return type === 'COUNTRY' ? createVote(Country) : createVote(Post)

})

module.exports = router