let sql=require('mysql2')

//load environment variables from.env file
require('dotenv').config() 

//create connection to database
let connection=sql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

connection.connect((err)=>{
    if(err){
        console.log('failed to connect');
        
    }else{
        console.log('database connection established');
        
    }
})

module.exports=connection