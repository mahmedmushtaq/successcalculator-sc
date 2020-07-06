import db from "../db";

class TaskModel{
    static addTasks(tasks){

        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{

                let query = "INSERT INTO tasks(task_name,completed,end_time,step_id,goal_id) VALUES";
                for(let i = 0; i<tasks.length;i++){
                    query = query + "('"
                        + tasks[i].task_name
                        + "','"
                        + tasks[i].completed
                        + "','"
                        + tasks[i].date
                        + "','"
                        + tasks[i].step_id
                        + "','"
                        + tasks[i].goal_id
                        + "')";
                    if (i != tasks.length - 1) {
                        query = query + ",";
                    }
                }


                tx.executeSql(query,
                    [],
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

    static getAllTasks(){

            const promise = new Promise((resolve, reject) => {
                db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM tasks',
                        [],
                        (_, result) => {
                            resolve(result);
                        },
                        (_, err) => {
                            reject(err);
                        }
                    );
                });
            });
            return promise;
        };


}

export default TaskModel;
