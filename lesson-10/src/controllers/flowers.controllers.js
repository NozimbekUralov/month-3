import { ClientError, globalError } from "shokhijakhon-error-handler"
import { db } from "../lib/db.js";

export default {
    POST: async function(req, res){
        try{
            let {name, color, price, category_id, image_path, import_from, description, count} = req.body;
            let [result] = await db.query(`SELECT * FROM category;`);
            if(!result.some((category) => category.id == category_id)) throw new ClientError('Category not found', 404);
            let [insertFlower] = await db.query(`INSERT INTO flowers (name, color, price, category_id, image_path, import_from, description, count) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [name, color, price, category_id, image_path, import_from, description, count]);
            if(insertFlower.insertId) return res.status(201).json({message: "Flower successfully created !", status: 201})
        }catch(err){
            return globalError(err, res);
        }
    }   
};