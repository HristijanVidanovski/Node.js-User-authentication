
//connect mongoose to database
const mongoose = require('mongoose') 
//const validator = require('validator')
mongoose.connect(process.env.MONGODB_URL, { //process.env.MONGODB_URL za da se skrie bazata
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})


