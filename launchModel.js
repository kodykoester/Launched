const mongoose = require('mongoose')

const launchSchema = mongoose.Schema(
    {
        rocket:{
            type: String,
            required: [true, "Please enter rocket name."]
        },
        altitude: {
            type: Number,
            required: true,
            default: 0
        },
        duration:{
            type: Number,
            required: true,
            default: 0
        },
        engine: {
            type: String,
            required: true,
            default: 'Unknown'
        },
        payload:{
            type: String,
            required: true,
            default: 'Unknown'
        }
    }
    )

    const Launch = mongoose.model('Launch', launchSchema);

    module.exports = Launch;