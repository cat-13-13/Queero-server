const Country = require("../models/Country.model")
const Post = require("../models/Post.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { verifyToken } = require("../middlewares/verifyToken")
const router = require("express").Router()

router.get('/', (req, res, next) => {


    Post
        .find()
        .populate('country', 'name flag')
        .populate('owner', 'name lastName avatar')
        .then(posts => res.json(posts))
        .catch(err => next(err))

})

router.post('/country/:country/', (req, res, next) => {

    const { country } = req.params
    const { sort } = req.body

    Post
        .find({ country })
        .populate('owner', 'avatar name lastName')
        .populate('country', 'flag name')
        .sort(sort)
        .then(posts => res.json(posts))
        .catch(err => next(err))

})

router.post('/create', verifyToken, (req, res, next) => {

    const { title, postImg, country, description } = req.body
    const { _id: owner } = req.payload
    const post = { title, postImg, owner, country, description }

    Post
        .create(post)
        .then(({ _id: postId }) => {
            const promises = [
                Country.findByIdAndUpdate(country, { $push: { posts: postId } }),
                Post.findById(postId)
            ]
            return Promise.all(promises)
        })
        .then(([, post]) => res.json(post._id))
        .catch(err => next(err))

})

router.get('/:id', (req, res, next) => {

    const { id } = req.params
    Post
        .findById(id)
        .populate({
            path: "comments",
            select: '-updatedAt',
            populate: {
                path: 'owner',
                select: '-__v -password -email -role -createdAt -updatedAt'
            }
        })
        .then(post => res.json(post))
        .catch(err => next(err))

})

router.get('/owner/:id', (req, res, next) => {

    const { id } = req.params

    Post
        .find({ owner: id })
        .populate('country', 'flag')
        .then(posts => {
            res.json(posts)
        })
        .catch(err => next(err))
})

router.put('/:id/edit', verifyToken, (req, res, next) => {

    const { id } = req.params
    const { title, postImg, description } = req.body
    const post = { title, postImg, description }

    Post
        .findByIdAndUpdate(id, post, { runValidators: true, new: true })
        .then(post => res.json(post))
        .catch(err => next(err))

})

router.delete('/:id/:country/delete', verifyToken, (req, res, next) => {

    const { id, country } = req.params
    const promises = [
        Country
            .findByIdAndUpdate(country, { $pull: { posts: id } })
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
            }),

        Post.findByIdAndDelete(id)
    ]

    Promise.all(promises)
        .then(([country]) => res.json(country._id))
        .catch(err => next(err))

})


module.exports = router
