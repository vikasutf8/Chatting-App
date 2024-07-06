import mongoose from "mongoose"

const connectDB =(uri)=>{
    mongoose
        .connect(uri)
        
        .then((data)=>(
            // console.log(data)
            `Connected to the database ${data.connection.host}`))
        .catch((err)=>{
            console.log('Error connecting to the database')
            throw err;
        })
}

export {
    connectDB
}