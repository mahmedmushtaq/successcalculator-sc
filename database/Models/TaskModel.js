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



    static taskQuery(sql,args=[]){
        const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    sql,
                    args,
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


    static getAllTasks(completed) {
        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" ORDER BY -end_time ASC')
    }

    static getAllTasksByGoalId(id){
         const passId = id || -1;
          return this.taskQuery('SELECT * FROM tasks WHERE goal_id='+passId);
    };

    static getAllTasksByStepIdAndStatus(goal_id,completed){

        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" and goal_id='+goal_id+' ORDER BY -end_time ASC')
    };

    static getAllTasksByIdWithStatus(id,completed){
        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" AND id='+id);
    };

    static deleteGoalTasks(goalId){
        return this.taskQuery('DELETE FROM tasks WHERE goal_id='+goalId);
    }

    static updateAllTasksById(value,id){
        return this.taskQuery('UPDATE tasks SET task_name=?, end_time=? WHERE id=?',[value.task_name,value.date,id]);
    }

    static insertNewRecord(value){
        let query = "INSERT INTO tasks(task_name,completed,end_time,step_id,goal_id) VALUES";

            query = query + "('"
                + value.task_name
                + "','"
                + value.completed
                + "','"
                + value.date
                + "','"
                + value.step_id
                + "','"
                + value.goal_id
                + "')";



         return this.taskQuery(query);


    }

    static deleteTask(id){
        return this.taskQuery("DELETE FROM tasks WHERE id="+id);
    }

    static deleteTaskByStepId(step_id){
        return this.taskQuery("DELETE FROM tasks WHERE step_id="+step_id);
    }


}

export default TaskModel;
