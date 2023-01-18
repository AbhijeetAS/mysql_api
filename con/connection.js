const mysql=require('mysql');

const connection=mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Abhi@123321',
        database:'Employee_DB'

    }
)

module.exports=connection;

