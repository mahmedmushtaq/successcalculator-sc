import db from "../db";

class GoalModel {
    static setNewGoal(wants_to){
       return this.goalQuery("INSERT INTO goals(wants_to) VALUES (?)",[wants_to]);
    }

    static goalQuery(sqlQuery,args=[]){
        return  new Promise((resolve,reject)=>{
            db.transaction(transaction => {
                transaction.executeSql(sqlQuery,  args,
                    (_,succRes) => {

                        resolve(succRes);
                    },
                    (_, err) => {
                        reject(err);
                    })
            })
        })


    }

    static deleteAllGoals(){
       return this.goalQuery("SELECT * FROM")

    }

    static deleteGoalById(id){
        return this.goalQuery("DELETE FROM goals WHERE id="+id);
    }




    static getGoals(value) {
       return this.goalQuery('SELECT * FROM goals WHERE completed="' + value.completed + '"');
    }

    static updateWantsTo(wants_to,goal_id){
        return this.goalQuery('UPDATE goals SET wants_to="'+wants_to+'" WHERE id='+goal_id);
    }



}

export default GoalModel;
