import db from "../db";
import moment from "moment";

class StepModel{
    static addSteps(heading,goal_id,total_tasks){
        return this.stepQuery("INSERT INTO steps(heading,goal_id,total_tasks) VALUES (?,?,?)",[heading,goal_id,total_tasks])

    }

    static stepQuery(sql,args=[]){
        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql(sql,
                    args,
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

    static getStepById(step_id){
       return this.stepQuery("SELECT * FROM steps WHERE id=?",[step_id])
    }


    static getStepsByGoalIdWithStatus(goalId){

        return this.stepQuery("SELECT * FROM steps WHERE goal_id="+goalId+" AND ended IS NULL")
    }

    static updateStepHeadingById(heading,stepId,total_tasks){
        return this.stepQuery('UPDATE steps SET heading="'+heading+'",total_tasks='+total_tasks+' WHERE id='+stepId);
    }


    static deleteStep(id){
        return this.stepQuery('DELETE FROM steps WHERE id='+id);
    }

    static stepComplete(stepId){

        return this.stepQuery("UPDATE steps SET ended=DATETIME('now','localtime'),total_tasks=0 WHERE id="+stepId);
    }

    static decreaseTasksInSteps(total_tasks,stepId){
        return this.stepQuery("UPDATE steps SET total_tasks="+total_tasks+" WHERE id="+stepId);
    }

    static getAllCompletedSteps(){
        return this.stepQuery("SELECT * FROM steps WHERE ended IS NOT NULL");
    }


}

export default StepModel;
