import db from "../db";

class StepModel{
    static addSteps(heading,goal_id){
        return this.stepQuery("INSERT INTO steps(heading,goal_id) VALUES (?,?)",[heading,goal_id])

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

        return this.stepQuery("SELECT * FROM steps WHERE goal_id="+goalId)
    }

    static updateStepHeadingById(heading,goalId){
        return this.stepQuery('UPDATE steps SET heading="'+heading+'" WHERE goal_id='+goalId);
    }


    static deleteStep(id){
        return this.stepQuery('DELETE FROM steps WHERE id='+id);
    }


}

export default StepModel;
