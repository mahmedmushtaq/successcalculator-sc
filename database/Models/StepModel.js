import db from "../db";

class StepModel{
    static addSteps(heading,goal_id){
        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql("INSERT INTO steps(heading,goal_id) VALUES (?,?)",
                    [heading,goal_id],
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


}

export default StepModel;
