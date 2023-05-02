const router = require("express").Router()
const Comment = require("../models/Comment.model")
const Country = require('../models/Country.model')
const { verifyToken } = require("../middlewares/verifyToken")



router.post('/', (req, res, next) => {

    const {
        discriminationProtection,
        violenceCriminalization,
        goodPlaceToLive,
        transgenderLegal,
        illegalSameSexRelationships,
        propaganda,
        calification,
        page,
    } = req.query

    const { sort } = req.body

    let queries = {}

    if (discriminationProtection) { queries.discriminationProtection = discriminationProtection }
    if (violenceCriminalization) { queries.violenceCriminalization = violenceCriminalization }
    if (goodPlaceToLive) queries.goodPlaceToLive = goodPlaceToLive
    if (transgenderLegal) queries.transgenderLegal = transgenderLegal
    if (illegalSameSexRelationships) queries.illegalSameSexRelationships = illegalSameSexRelationships
    if (propaganda) queries.propaganda = propaganda
    if (calification) queries.calification = calification

    const perPage = 20;
    const actualPage = parseInt(page) || 1
    const skip = (actualPage - 1) * perPage
    let totalPages

    Country
        .countDocuments(queries)
        .then(count => {
            totalPages = Math.ceil(count / perPage)

            return Country
                .find(queries)
                .sort(sort)
                .skip(skip)
                .limit(perPage)
        })
        .then(countries => res.json({
            countries,
            totalPages,
            currentPage: actualPage
        }))
        .catch(err => next(err))

})


router.get('/names', (req, res, next) => {

    const { page } = req.query

    Country
        .find()
        .select({ name: 1 })
        .skip(page * 20 - 20)
        .limit(20)
        .then(data => res.json(data))
        .catch(err => next(err))
})

router.get('/nameslist', (req, res, next) => {


    Country
        .find()
        .select({ name: 1 })
        .then(data => res.json(data))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params

    Country
        .findById(id)
        .populate({
            path: "comments",
            select: '-updatedAt',
            populate: {
                path: 'owner',
                select: '-__v -password -email -role -createdAt -updatedAt'
            },
        })
        .populate({
            path: 'posts',
            select: 'title owner country',
            populate: {
                path: 'owner',
                select: 'name lastName avatar'
            },

        })
        .populate({
            path: 'posts',
            populate: {
                path: 'country',
                select: 'name flag'
            },

        })
        .then(country => res.json(country))
        .catch(err => next(err))

})

router.get('/code/:code', (req, res, next) => {

    const { code } = req.params

    Country
        .findOne({ alpha3Code: code })
        .select({
            name: 1,
            discriminationProtection: 1,
            violenceCriminalization: 1,
            goodPlaceToLive: 1,
            transgenderLegal: 1,
            transMurderRates: 1,
            illegalSameSexRelationships: 1,
            propaganda: 1,
            calification: 1,
            flag: 1,
            score: 1
        })
        .then(country => res.json(country))
        .catch(err => next(err))

})


router.put('/:id/edit', verifyToken, (req, res, next) => {

    const { id } = req.params
    const {
        name,
        description,
        img,
        alpha3Code,
        discriminationProtection,
        violenceCriminalization,
        goodPlaceToLive,
        transgenderLegal,
        transMurderRates,
        illegalSameSexRelationships,
        propaganda,
        safetyIndex,
        calification,
    } = req.body
    const country = {
        name,
        description,
        img,
        alpha3Code,
        discriminationProtection,
        violenceCriminalization,
        goodPlaceToLive,
        transgenderLegal,
        transMurderRates,
        illegalSameSexRelationships,
        propaganda,
        safetyIndex,
        calification,
    }

    Country
        .findByIdAndUpdate(id, country, { runValidators: true, new: true })
        .then(country => res.json(country))
        .catch(err => next(err))

})

router.delete('/:id/delete', verifyToken, (req, res, next) => {

    const { id } = req.params

    Country
        .findByIdAndDelete(id)
        .then(country => res.json(country))
        .catch(err => next(err))

})

module.exports = router