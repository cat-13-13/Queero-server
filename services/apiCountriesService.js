const axios = require('axios')

class ApiCountriesService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://restcountries.com/v3.1'
        })
    }

    getAllCountries = () => {
        return this.api.get(`/all`)
    }
}

module.exports = new ApiCountriesService()