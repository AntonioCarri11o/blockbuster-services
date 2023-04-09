//const mysql = require('mysql2/promise');
const db = require('mysql2');
require('dotenv').config();
/*
const database=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'blockbuster'
});

const client = db.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'blockbuster'
});
*/
const query=(query,params)=>{
    return new Promise((resolve, reject)=>{
        client.getConnection((err,client)=>{
            if(err)reject (err);
            client.query(query,params,(err,rows)=>{
                if(err)reject(err);
                resolve(rows);
            });
        });
    });
};

module.exports={
    database,
    query
}