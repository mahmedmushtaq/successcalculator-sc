import db from "../db";
import moment from "moment";

class GoalModel {
    static setNewGoal(wants_to,total_steps){
       return this.goalQuery("INSERT INTO goals(wants_to,total_steps) VALUES (?,?)",[wants_to,total_steps]);
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

    static updateWantsTo(wants_to,goal_id,total_steps){
        return this.goalQuery('UPDATE goals SET wants_to="'+wants_to+'",total_steps='+total_steps+' WHERE id='+goal_id);
    }

    static updateTotalStepsOrIsGoalCompleted(total_steps,id){
        if(total_steps === 0){
            // goal is completed
            return this.goalQuery("UPDATE goals SET completed='yes',total_steps=0,ended=DATETIME('now','localtime') WHERE id="+id);
        }else{
            return this.goalQuery("UPDATE goals SET total_steps="+total_steps+" WHERE id="+id);
        }
    }




}

export default GoalModel;
