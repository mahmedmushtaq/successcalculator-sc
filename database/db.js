import * as SQLite from 'expo-sqlite';

const db  = SQLite.openDatabase("sc.db");

export const goalTable = ()=>{
    return new Promise((resolve,reject)=>{
        db.transaction(transaction => {
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY NOT NULL, wants_to VARCHAR(100) NOT NULL,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);',
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
}


export const stepsTable = ()=>{
    return new Promise((resolve,reject)=>{
        db.transaction(transaction => {
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, heading VARCHAR(100), goal_id INTEGER ,  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);',
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
}



export const tasksTable = ()=>{
    return new Promise((resolve,reject)=>{
        db.transaction(transaction => {
            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, task_name VARCHAR(100), completed BOOLEAN, end_time DATETIME DEFAULT NULL,step_id INTEGER,   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);',
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
}

export default db;
