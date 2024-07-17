import {body,validationResult} from 'express-validator'
import { ErrorHandler } from '../utils/utility.js'

const registerValidator = () => [
    body("name","Please fill name").notEmpty(),
    body("username","Please fill username").notEmpty(),
    body("password","Please fill password").notEmpty(),
    body("bio","Please fill bio").notEmpty(),


]

const validateHandler =(req,res,next) =>{
    const errors = validationResult(req)
    // console.log(errors)
    const errorMessages = errors.array().map((error) => error.msg).join(", ") //string got after join
    if(errors.isEmpty()){
        return next()
    }
    else{
        return next(new ErrorHandler(errorMessages,400))
    }
}
export { registerValidator , validateHandler}