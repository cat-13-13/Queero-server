const parseCountries = (countries, countriesApi) => {


    const parsedCountries = countries.map(elm => {

        const coincidentCountry = countriesApi.find(country => country.cca3 === elm.alpha3Code)
        const { currencies, capital, region, subregion, languages, latlng, area, flag, maps, population } = coincidentCountry
        const currenciesParsed = []
        const languagesParsed = []
        const location = { type: 'Point', coordinates: latlng }
        let capitalParsed

        for (const key in currencies) {

            const { name } = coincidentCountry.currencies[key]
            currenciesParsed.push({ name, code: key })

        }

        for (const key in languages) {

            languagesParsed.push(coincidentCountry.languages[key])

        }

        capital ? capitalParsed = capital[0] : capitalParsed = 'NO INFO'
        return { ...elm, currencies: currenciesParsed, capital: capitalParsed, region, subregion, languages: languagesParsed, location, area, flag, maps, population }
    })

    return parsedCountries

}

module.exports = { parseCountries }