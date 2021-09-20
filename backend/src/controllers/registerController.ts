import {Request, Response , NextFunction} from 'express';
import mongoose from 'mongoose';
import User from '../models/userModels';

export default{


    async RegisterUser(req: Request , res: Response, next:NextFunction){
        
        let { name, email , password } = req.body;
        let confirmed = false;

        

        const code = (len:number) => {
            let code = '';
            do{
                code += Math.random().toString(36).substr(2);
            } while (code.length < len)
            code = code.substr(0, len)
            return code;
        }

        let confirmCode = code(6);

        await User.findOne({email:email})
        .exec()
        .then(results => {
            if (results == null){

                const user = new User ({
                    id: new mongoose.Types.ObjectId(),
                    name,
                    email,
                    password,
                    confirmed,
                    confirmCode
                });
        
                return user.save()
                .then(result => {

                    
                    
                    return res.status(201).json({
                        user: result
                    })

                    
                })
                .catch( err => {
                    return res.status(500).json({
                        message: err.message,
                        err
                    });
                });

            }

            return res.status(401).json({
                user: results,
                message: 'email já cadastrado'
            })
        })

        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        
        next();
        
    },

    ConfirmCode(req: Request , res: Response, next:NextFunction){
        
        let { email, confirmCode} = req.body;
        let confirmed = true;

        User.findOne({confirmCode:confirmCode})
        .exec()
        .then(results => {
            if (results == null){
                return res.status(401).json({
                    user: results,
                    message: 'codigo incorreto'
                });
            }

            User.update({ email: email }, {confirmed: confirmed })
            .then(result => {
                return res.status(200).json({
                    user: result
                });
            })
            
            .catch( err => {
                return res.status(500).json({
                    message: err.message,
                    err
                });
            });
        })

        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        
    },

    ChangeEmail(req: Request , res: Response, next:NextFunction){

        let { email } = req.body;

        User.deleteOne({email:email})
        .then(result => {
            return res.status(200).json({
                user: result
            })
        })
        .catch( err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        });

    },

    async ChangeCode(req: Request , res: Response, next:NextFunction){

        let { email } = req.body;

        const code = (len:number) => {
            let code = '';
            do{
                code += Math.random().toString(36).substr(2);
            } while (code.length < len)
            code = code.substr(0, len)
            return code;
        }

        let confirmCode = code(6);


        await User.update({ email: email }, {confirmCode: confirmCode })
        .then(result => {
            return res.status(201).json({
                user: result
            })
        })
        .catch( err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        });

        next();

    },

    ListUser(req: Request , res: Response){
        
        User.find()
        .exec()
        .then(results => {
            return res.status(200).json({
                users: results,
                count: results.length,
            })
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
    }


};