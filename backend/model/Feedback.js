const mongoose = require('mongoose')
const FeedBack = new mongoose.Schema({
    rideid: {
        type: String,
    },
    user: {
        type: String,
    },
    adminfeedback: {
        type: String,
    },
}

)
module.exports = mongoose.model("FeedBack", FeedBack);