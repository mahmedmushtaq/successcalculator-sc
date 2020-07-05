import db from "./db";

class DbModel{


   static dropTable(table_name){

       return new Promise((resolve,reject)=>{
           db.transaction(tx=>{
               tx.executeSql("DROP table "+table_name),
                   [],
                   (_,succRes) => {
                       resolve(succRes);
                   },
                   (_, err) => {
                       reject(err);
                   }
           })
       })
   }
}

export default DbModel;
