import db from "./db";

class DbModel{
   static setNewGoal(wants_to){
       return new Promise((resolve,reject)=>{
           db.transaction(tx=>{
               tx.executeSql("INSERT INTO goals VALUES (?)",
                   [wants_to],
                   (_,succRes) => {
                       resolve();
                   },
                   (_, err) => {
                       reject(err);
                   }
                   )
           })
       })
   }

   static dropTable(table_name){
       return new Promise((resolve,reject)=>{
           db.transaction(tx=>{
               tx.executeSql("DROP table "+table_name),
                   [],
                   (_,succRes) => {
                       resolve();
                   },
                   (_, err) => {
                       reject(err);
                   }
           })
       })
   }
}
