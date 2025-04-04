require('dotenv').config();

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/chat-app-concept')


const app  =require('express')()
const http =require('http').Server(app)

const userRoute =require('./routers/user.route..js')
app.use('/',userRoute)


http.listen(3005, function(){
    console.log(`running at port 3005`)
})