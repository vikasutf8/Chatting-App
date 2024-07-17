import {body,check,param,validationResult} from 'express-validator'
import { ErrorHandler } from '../utils/utility.js'

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
const registerValidator = () => [
    body("name","Please fill name").notEmpty(),
    body("username","Please fill username").notEmpty(),
    body("password","Please fill password").notEmpty(),
    body("bio","Please fill bio").notEmpty(),
    check("avatar","Please upload avatar").notEmpty(),
]
const loginValidator = () => [
    body("username","Please fill username").notEmpty(),  
    body("password","Please fill password").notEmpty(),
]
const newGroupValidator = () => [
    body("name","Please fill name").notEmpty(),
    body("members")
    .notEmpty().withMessage("members is required")
    .isArray({min:2 , max:100}).withMessage("Members should be an array with minimum 2 and maximum 100 members")
]
const addMembersValidator = () => [
   body("chatId","Please fill chatId").notEmpty(),
    body("members")
    .notEmpty().withMessage("members is required")
    .isArray({min:1 , max:97}).withMessage("Atleast 3 members should be added")
]
const removeMembersValidator = () => [
    body("chatId","Please fill group Name/ID ").notEmpty(),
    body("userId","Please fill userID || members name").notEmpty(),
]
const sendAttachmentsValidator = () =>[
    body("chatId","Please fill group Name/ID ").notEmpty(),
    check("files")
    .notEmpty().withMessage("Please Upload Attachments")
    .isArray({min:1 , max:5}).withMessage("Attachments must be under limit")
]
const chatIdValidor =() =>[
    param("_id","Please fill group Name/ID ").notEmpty(),

]
const removeGroupValidator =() =>[
    param("_id","Please fill group Name/ID ").notEmpty(),
    body("name","Please fill New Name")
]
export { registerValidator , validateHandler,loginValidator, newGroupValidator,addMembersValidator, removeMembersValidator,sendAttachmentsValidator,chatIdValidor,removeGroupValidator}