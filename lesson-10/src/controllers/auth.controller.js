import { ClientError, globalError } from "shokhijakhon-error-handler"
import { db } from "../lib/db.js";
import { customerLoginSchema, customerSchema } from "../utils/validator.js";
import { HashingService } from "../lib/hash.js";
import { jwtConfig } from "../lib/jwt.js";

export default {
    REGISTER: async (req, res) => {
        try{
            let newCustomer = req.body;
            let [allUsers] = await db.query(`SELECT email FROM customers`);
            let validate = customerSchema.validate(newCustomer, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            if(allUsers.some(({email}) => newCustomer.email == email)) throw new ClientError('Customer already exists !', 400);
            newCustomer = {...newCustomer, password: await HashingService.hashingPassword(newCustomer.password)};
            let [result] = await db.query(`INSERT INTO customers SET ?`, [newCustomer]);
            return res.status(201).json({token: jwtConfig.createToken({id: result.insertId, userAgent: req.headers["user-agent"]}), id: result.insertId})
        }catch(err){
            return globalError(err, res)
        }
    },
    LOGIN: async (req, res) => {
        try{
            let customer = req.body;
            let validate = customerLoginSchema.validate(customer, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            let [[user]] = await db.query(`SELECT id, email, password FROM customers WHERE email=?`, [customer.email]);
            if(!user) throw new ClientError('User not found !', 404);
            console.log(user)
            let comparePassword = await HashingService.comparePassword(customer.password, user.password);
            if(!comparePassword) throw new ClientError('User not found !', 404);
            return res.status(201).json({token: jwtConfig.createToken({id: user.id, userAgent: req.headers["user-agent"]}), id: user.id})
        }catch(err){
            globalError(err, res);
        }
    }
}