import {ClientError, globalError} from "shokhijakhon-error-handler"
import { db } from "../lib/db.js";
export default {
    POST: async function(req, res){
        try{
            let newCategory = req.body;
            let [result] = await db.query(`SELECT * FROM category;`);
            if(result.some((category) => category.name == newCategory.name)) throw new ClientError('Category already exists', 400);
            let insertCategory = await db.query(`INSERT INTO category SET name=?`, [newCategory.name]);
            let insertId = insertCategory[0].insertId;
            if(insertId) return res.status(201).json({message: "Category successfully created !", data: {id: insertId, name: newCategory.name}})
        }catch(err){
            return globalError(err, res);
        }
    },
    DELETE: async function(req, res){
        try{
            let {deleteId} = req.params;   
            let [result] = await db.query(`SELECT * FROM category;`);
            if(!result.some((category) => category.id == deleteId)) throw new ClientError('Category not found', 404);
            let [deleteCategory]= await db.query(`DELETE from category WHERE id=?`, [deleteId]);
            if(deleteCategory.affectedRows) return res.json({message: "Category successfully deleted !"})
        }catch(err){
            return globalError(err, res)
        }
    }
}