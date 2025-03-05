let express=require('express')
let connection=require('./database')
let app=express()
app.use(express.json())

// for getting data from database
app.get('/database',(req,res)=>{
    let qry='select * from users'
    connection.query(qry,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

// for inserting data into database
app.post('/postdata',(req,res)=>{
    let qry=`insert into users(name,mobile,email,password,token) values('goutham','9867542310','sample@gmail.com','123456','sampleToken')`
    connection.query(qry,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send('Data inserted successfully')
        }
    })
})


app.listen(3000,(err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log('server started');
        
    }
})