const router = require("express").Router()
const Comment = require("../models/Comment.model")
const Country = require('../models/Country.model')
const Post = require('../models/Post.model')
const { verifyToken } = require("../middlewares/verifyToken")


router.get('/:type/:id', (req, res, next) => {

    const { type, id } = req.params
    const getPageComments = model => {
        return model.findById(id)
            .select({ comments: 1 })
            .populate({
                path: "comments",
                select: '-updatedAt',
                populate: {
                    path: 'owner',
                    select: '-__v -password -email -role -createdAt -updatedAt'
                }
            })
            .then(comments => res.json(comments))
            .catch(err => next(err))
    }
    return type === 'COUNTRY' ? getPageComments(Country) : getPageComments(Post)

})

router.post('/create/:type/:id', verifyToken, (req, res, next) => {

    const { id, type } = req.params
    const { _id: owner } = req.payload
    const { comment } = req.body

    Comment
        .create({ owner, comment, type })
        .then(({ _id: commentId }) => {
            const promises = [
                Comment.findById(commentId).populate({
                    path: 'owner',
                    select: '-__v -password -email -role -createdAt -updatedAt'
                })
            ]
            type === 'COUNTRY' ?
                promises.push(Country.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true }))
                : promises.push(Post.findByIdAndUpdate(id, { $push: { comments: commentId } }, { new: true }))
            return Promise.all(promises)
        })
        .then(([comment]) => res.json(comment))
        .catch(err => next(err))

})


router.put('/edit/:id', verifyToken, (req, res, next) => {

    const { id } = req.params
    const { comment } = req.body

    Comment
        .findByIdAndUpdate(id, { comment }, { runValidators: true, new: true })
        .then(response => res.json(response))
        .catch(err => next(err))

})


router.delete('/delete/:type/:typeId/:id', verifyToken, (req, res, next) => {

    const { id, type, typeId } = req.params


    Comment
        .findByIdAndDelete(id)
        .then(() => {
            if (type === 'COUNTRY') {
                return Country
                    .findByIdAndUpdate(typeId, { $pull: { comments: id } })
                    .populate({
                        path: "comments",
                        select: '-updatedAt',
                        populate: {
                            path: 'owner',
                            select: '-__v -password -email -role -createdAt -updatedAt'
                        }
                    })
                    .populate({
                        path: 'posts',
                        select: 'title'
                    })
            }
            else {
                return Post
                    .findByIdAndUpdate(typeId, { $pull: { comments: id } })
                    .populate({
                        path: "comments",
                        select: '-updatedAt',
                        populate: {
                            path: 'owner',
                            select: '-__v -password -email -role -createdAt -updatedAt'
                        }
                    })
            }

        })
        .then(response => res.json(response))
        .catch(err => next(err))

})

module.exports = router