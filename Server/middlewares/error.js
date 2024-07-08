
const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500; 

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
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