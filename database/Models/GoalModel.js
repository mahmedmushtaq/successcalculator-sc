import db from "../db";

class GoalModel {
    static setNewGoal(wants_to){

        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql("INSERT INTO goals(wants_to) VALUES (?)",
                    [wants_to],
                    (_,succRes) => {

                        resolve(succRes);
                    },
                    (_, err) => {
                        reject(err);
                    }
                )
            })
        })
    }
    static deleteAllGoals(){
       return new Promise((resolve,reject)=>{
           db.transaction(transaction => {
               transaction.executeSql("DELETE FROM goals"),  [],
                   (_,succRes) => {
                       resolve(succRes);
                   },
                   (_, err) => {
                       reject(err);
                   }
           })
       })

    }


    static selectParticularGoal(value){
        let query;
        if(value.onlyLastRecord){
            query += "SELECT * FROM goals WHERE completed="+value.completed+" ORDER BY id DESC LIMIT 1";
        }else{
            query += "SELECT * FROM goals WHERE completed="+value.completed+" AND id="+value.id+" ORDER BY  id DESC";
        }
        return new Promise((resolve,reject)=>{
            db.transaction(transaction => {

                transaction.executeSql(query),[],  (_,succRes) => {
                    resolve(succRes);
                },
                    (_, err) => {
                        reject(err);
                    }
            })
        })
    }
}

export default GoalModel;
