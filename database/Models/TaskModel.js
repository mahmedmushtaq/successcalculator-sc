import db from "../db";
import StepModel from "./StepModel";
import GoalModel from "./GoalModel";
import moment from "moment";

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
          return this.taskQuery('SELECT * FROM tasks WHERE goal_id='+passId+" ORDER BY -end_time ASC");
    };

    static getAllTasksByGoalIdAndStatus(goal_id,completed){
        const id = goal_id || -1;

        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" and goal_id='+id+' ORDER BY -end_time ASC')
    };

    static getAllTasksByStepIdAndStatus(stepId,completed){


        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" and step_id='+stepId+' ORDER BY -end_time ASC')
    };

    static getAllTasksByIdWithStatus(id,completed){
        return this.taskQuery('SELECT * FROM tasks WHERE completed="'+completed+'" AND id='+id);
    };

    static deleteGoalTasks(goalId){
      //  const stepData = await StepModel.getStepsByGoalIdWithStatus()
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

    static async taskCompleted(goal_data,step_data,task_id){
        const totalTasksInSteps = step_data.tasks.length;
        if(totalTasksInSteps-1 === 0){
            // step is completed
            await StepModel.stepComplete(step_data.id);
            const totalSteps = goal_data.steps.length-1;
            await GoalModel.updateTotalStepsOrIsGoalCompleted(totalSteps,goal_data.id);

        }else{
            await StepModel.decreaseTasksInSteps(step_data.tasks.length-1,step_data.id);
        }



        return this.taskQuery("UPDATE tasks SET completed='yes',ended=DATETIME('now','localtime') WHERE id="+task_id)


    }


}

export default TaskModel;
