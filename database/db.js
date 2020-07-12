import * as SQLite from 'expo-sqlite';
import moment from "moment";
const db  = SQLite.openDatabase("sc.db");


const generateTable = (sqlQuery)=>new Promise((resolve,reject)=>{
    db.transaction(transaction => {
        transaction.executeSql(
            sqlQuery,
            [],
            (_,succRes) => {
                resolve();
            },
            (_, err) => {
                reject(err);
            }
        )
    })
})

export const goalTable = ()=>(
    generateTable('CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, wants_to VARCHAR(100) NOT NULL, total_steps INTEGER, completed BOOLEAN default false,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,ended DATETIME DEFAULT NULL,show_on_front_screen INTEGER DEFAULT 0);')
)




export const stepsTable = ()=>(
    generateTable('CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, heading VARCHAR(100), goal_id INTEGER, total_tasks INTEGER ,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,ended DATETIME DEFAULT NULL);')
)



export const tasksTable = ()=>(
    generateTable('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, task_name VARCHAR(100), completed BOOLEAN, end_time DATETIME DEFAULT NULL,step_id INTEGER, goal_id INTEGER, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,ended DATETIME DEFAULT NULL);')
)

export default db;
