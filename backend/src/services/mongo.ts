import { connect } from "mongoose";
import configs from '../configs/configs';

const uri = `mongodb+srv://${configs.bdUser}:${configs.bdPass}@cluster0.txuoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const conectDB = async ()=>{
  await connect(uri);
}

export default conectDB;