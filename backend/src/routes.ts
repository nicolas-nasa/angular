import { Router } from "express";
import confirmationController from "./controllers/confirmationController";
import connect from './services/mongo';
import registerController from "./controllers/registerController";

const routes = Router();


connect()

routes.get('/', (req, res)=>{
    
    res.json( 'api online' );
})

routes.get('/listUser', registerController.ListUser); 

routes.patch('/ChangeCode', registerController.ChangeCode, confirmationController.SendNewCode);

routes.patch('/ConfirmCode', registerController.ConfirmCode);

routes.delete('/changeemail', registerController.ChangeEmail); 

routes.post('/registeruser',  registerController.RegisterUser, confirmationController.SendCode); 

routes.post('/send', confirmationController.SendCode);

export default routes;