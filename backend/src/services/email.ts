import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import configs from '../configs/configs';

class Mail {
    constructor(
        public to?: string,
        public subject?: string,
        public message?: string
    ){}

    async sendMail(){

        let mailOptions = {
            from: "nicolasarielsalmeida@gmail.com",
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        const transporter = nodemailer.createTransport({
            host: configs.emailHost,
            port: configs.emailPort,
            secure: false,
            auth: {
                user: configs.emailUser,
                pass: configs.emailPass
            },
            tls: { rejectUnauthorized: false}
        });

        console.log(mailOptions);

        transporter.sendMail(mailOptions, (err, inf) => {
            if (err){
                console.log(err);
                return err;
            }else{
                return "Email send!";
            }

        });
    }

}


export default new Mail;