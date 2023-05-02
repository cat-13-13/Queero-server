const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            default: ''
        },
        img: {
            type: String,
            trim: true,
            default: ''
        },
        alpha3Code: {
            type: String,
            required: [true, 'Alpha3Code is required.'],
            uppercase: true,
            trim: true
        },
        discriminationProtection: {
            type: String,
            required: [true, 'Discrimination protection is required.'],
            trim: true
        },
        violenceCriminalization: {
            type: String,
            required: [true, 'Violence criminalization is required.'],
            trim: true
        },
        goodPlaceToLive: {
            type: String,
            required: [true, 'Good place to live is required.'],
            trim: true
        },
        transgenderLegal: {
            type: String,
            required: [true, 'Transgender legal is required.'],
            trim: true
        },
        transMurderRates: {
            type: Number,
            required: [true, 'Transgender murder rates is required.'],
            trim: true
        },
        illegalSameSexRelationships: {
            type: String,
            required: [true, 'Ilegal same sex relationships is required.'],
            trim: true
        },
        propaganda: {
            type: String,
            required: [true, 'Propaganda is required.'],
            trim: true
        },
        safetyIndex: {
            type: Number,
            required: [true, 'Safety index is required.'],
            trim: true
        },
        score: {
            type: Number,
            default: 0,
        },
        calification: {
            type: String,
            required: [true, 'Calification is required.'],
            trim: true
        },
        currencies: [
            {
                name: {
                    type: String,
                    required: [true, 'Currency name required.']
                },
                code: {
                    type: String,
                    required: [true, 'Currency code required.']
                }
            }
        ],
        capital: {
            type: String,
            required: [true, 'Capital is required.'],
            trim: true
        },
        region: {
            type: String,
            required: [true, 'Region is required.'],
            trim: true
        },
        subregion: {
            type: String,
            required: [true, 'Subregion is required.'],
            trim: true
        },
        languages: {
            type: [String],
            required: [true, 'Languages required.']
        },
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number],
                required: [true, 'Location is required.'],
                trim: true
            }
        }
        ,
        area: {
            type: Number,
            required: [true, 'Area is required.'],
            trim: true
        },
        flag: {
            type: String,
            required: [true, 'Flag is required.'],
            trim: true
        },
        maps: {
            googleMaps: { type: String },
            openStreetMaps: { type: String }
        },
        population: {
            type: Number,
            required: [true, 'Population is required.'],
            trim: true
        },
        comments: [{
            ref: 'comment',
            type: Schema.Types.ObjectId
        }],
        posts: [{
            ref: 'post',
            type: Schema.Types.ObjectId
        }],
        votes: [{
            ref: 'vote',
            type: Schema.Types.ObjectId
        }],
    },
    {
        timestamps: true
    }
);

const Country = model("country", countrySchema);

module.exports = Country;
