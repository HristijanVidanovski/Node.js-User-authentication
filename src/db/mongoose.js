

//connect mongoose to database
const mongoose = require('mongoose') 
//const validator = require('validator')
mongoose.connect(process.env.MONGODB_URL, { //process.env.MONGODB_URL za da se skrie bazata
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
})



//create instance of mongoose model
/*const task1 = new task({description:'Task 1    '})
task1.save().then((result) => {
    console.log(result)
}).catch((error) => {
console.log(error)
})
*/