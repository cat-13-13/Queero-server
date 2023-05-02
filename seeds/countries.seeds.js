const countries = require('./data')
const ApiCountriesService = require("../services/apiCountriesService")
const Country = require('../models/Country.model')
const { parseCountries } = require('../utils/parsedCountries')
const mongoose = require('mongoose')

require('../db')

ApiCountriesService
    .getAllCountries()
    .then(({ data }) => parseCountries(countries, data))
    .then(data => Country.insertMany(data))
    .then(() => console.log('The countries are in the data base.'))
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))