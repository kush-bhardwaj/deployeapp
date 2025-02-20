const express = require('express');
const { body, validationResult } = require("express-validator")
const { signup, login } = require('../controlls/AdmindAccountController');
const AdminAccRouter = express.Router()
function validate(){
    return[
        body('email').isEmail().trim(),
        // body('password'). with regex formate and withMessage.
        (req,res,next)=>{
            const result = validationResult(req)
            if(!result){
                return res.json({error:result.array()})
            }
            else{
                next()
            }
        }
    ]
}
AdminAccRouter.post('/signup', signup);
AdminAccRouter.post('/login',validate(), login)
module.exports = AdminAccRouter