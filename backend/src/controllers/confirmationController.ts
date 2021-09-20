import {Request, Response, NextFunction} from 'express';
import mail from "../services/email";
import configs from '../configs/configs';
import User from '../models/userModels';


export default {
    SendCode( req: Request, res:Response, next:NextFunction) {
        

        let  headers =  req.headers;
        let { email } = req.body;
        var code:string | undefined; 



        User.findOne({email:email})
        .exec()
        .then(results => {
           code =  results?.confirmCode;
           const ptMessage = `Este é o seu codigo de confirmação `+code;
           if( headers['accept-language'] == 'pt-BR,pt;q=0.9'){
            mail.to = configs.$TEST_EMAIL+';'+email;
            mail.subject = 'nodemailer';
            mail.message = ptMessage;
            mail.sendMail();
            console.log(headers);
            res.status(200).json('email enviado');

        }else{

            const enMessage = `This is your confirmation code `+code;
            
            mail.to = configs.$TEST_EMAIL+';'+email;
            mail.subject = 'nodemailer';
            mail.message = enMessage;
            mail.sendMail();

            console.log(headers);
            res.status(200).json('email enviado');
        }
        })

        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })

       
    },

    SendNewCode( req: Request, res:Response, next:NextFunction) {

        let  headers =  req.headers;
        let { email } = req.body;
        var code:string | undefined; 

        
        

        User.findOne({email:email})
        .exec()
        .then(results => {
           code =  results?.confirmCode;

           if( headers['accept-language'] == 'pt-BR,pt;q=0.9'){

            const ptMessage = `Este é o seu novo codigo de confirmação `+code;

            mail.to = configs.$TEST_EMAIL+';'+email;
            mail.subject = 'nodemailer';
            mail.message = ptMessage;
            mail.sendMail();
            console.log(headers);
            res.status(200).json('email enviado');

        }else{

            const enMessage = `This is your new confirmation code `+code;
            
            mail.to = configs.$TEST_EMAIL+';'+email;
            mail.subject = 'nodemailer';
            mail.message = enMessage;
            mail.sendMail();

            console.log(headers);
            res.status(200).json('email enviado');
        }
        })

        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })

    }
}