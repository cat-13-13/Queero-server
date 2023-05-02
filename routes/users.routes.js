const router = require("express").Router()
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")
const uploaderMiddleware = require("../middlewares/uploader.middleware")
const { verifyToken } = require("../middlewares/verifyToken")


router.get("/", verifyToken, (req, res, next) => {

    User
        .find()
        .select({ name: 1 })
        .sort({ name: 1 })
        .then(users => res.json(users))
        .catch(err => next(err))

})

router.get("/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .populate('favoriteCountries', 'name flag')
        .populate({
            path: 'favoritePosts',
            select: 'title country',
            populate: {
                path: 'country',
                select: 'flag'
            }
        })
        .then(user => res.json(user))
        .catch(err => next(err))

})

router.put("/:id/edit", verifyToken, (req, res, next) => {

    const { id } = req.params
    const { name, lastName, avatar } = req.body

    User
        .findByIdAndUpdate(id, { name, lastName, avatar }, { runValidators: true, new: true })
        .then(user => {

            const authToken = user.signToken()
            res.status(200).json({ authToken })

        })
        .then(user => res.json(user))
        .catch(err => next(err))

})

router.put("/addFavorite/:type/:typeId", verifyToken, (req, res, next) => {

    const { type, typeId } = req.params
    const { _id: id } = req.payload

    User.findById(id)
        .select({ _id: 1, favoriteCountries: 1, favoritePosts: 1 })
        .then(({ favoriteCountries, favoritePosts }) => {
            let isFavorite
            type === 'COUNTRY'
                ? isFavorite = favoriteCountries.filter(({ _id: favoriteID }) => favoriteID == typeId)
                : isFavorite = favoritePosts.filter(({ _id: favoriteID }) => favoriteID == typeId)

            if (isFavorite.length) {

                return type === 'COUNTRY'
                    ? User.findByIdAndUpdate(id, { $pull: { favoriteCountries: typeId } }, { new: true })
                    : User.findByIdAndUpdate(id, { $pull: { favoritePosts: typeId } }, { new: true })

            } else {

                return type === 'COUNTRY'
                    ? User.findByIdAndUpdate(id, { $push: { favoriteCountries: typeId } }, { new: true })
                    : User.findByIdAndUpdate(id, { $push: { favoritePosts: typeId } }, { new: true })

            }

        })
        .then(result => res.json(result))
        .catch(err => next(err))

})

router.get("/isFavorite/:type/:typeId", verifyToken, (req, res, next) => {

    const { type, typeId } = req.params
    const { _id: id } = req.payload


    User.findById(id)
        .select({ _id: 1, favoriteCountries: 1, favoritePosts: 1 })
        .then(({ favoriteCountries, favoritePosts }) => {
            let isFavorite
            type === 'COUNTRY'
                ? isFavorite = favoriteCountries.filter(({ _id: favoriteID }) => favoriteID == typeId)
                : isFavorite = favoritePosts.filter(({ _id: favoriteID }) => favoriteID == typeId)

            return isFavorite.length ? res.json(true) : res.json(false)
        })
        .then(result => res.json(result))
        .catch(err => next(err))

})

router.delete("/:id/delete", verifyToken, (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(user => res.json("User deleted succesfully"))
        .catch(err => next(err))

})



module.exports = router