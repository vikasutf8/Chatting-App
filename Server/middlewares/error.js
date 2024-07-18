import { envMode } from "../app.js";

// "E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"test5\" }"
const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500; 

    if (err.code === 11000) {
        err.statusCode = 400;
        err.message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    }
// wrong  ID giben
    if(err.name ==="CastError"){
        err.statusCode = 400;
        err.message = `Invalid ${err.path} : ${err.value}`;
    }
    // console.log( process.env.NODE_ENV.trim() )
    return res.status(err.statusCode).json({
        success: false,
        message: envMode === "DEVELOPMENT" ? err : err.message,
    });
}

const TryCatch =(passedFunc)=> async(req,res,next)=>{
    try {
        
        await passedFunc(req,res,next)
    } catch (error) {
        console.log(error.message ," :Error in TryCatch")
        next(error)
    }
}
export {
    errorMiddleware,
    TryCatch
}