const express=require('express');

const app=express();

const port=process.env.port || 6000;

const connection=require('./con/connection');

app.use(express.json());



// app.get('/',(req,resp)=>
// {
//     resp.send("hello from the root");
// })


connection.connect(()=>
{
    try{
        console.log("database is susccesfully connected");
    }
    catch(err)
    {
       console.log("not connected");
    }
})

app.post('/',(req,resp)=>
{
  //  const {id,em_name,em_email,em_gender}=req.body
  const _id=req.body.id;
  const _em_name=req.body.em_name;
  // console.log(_em_name);
  const _em_email=req.body.em_email;
  const _em_gender=req.body.em_gender;
  const que=`insert into employee values(${_id},"${_em_name}","${_em_email}","${_em_gender}")`;
   connection.query(que,(err,result)=>
   {
          try{
            resp.send(result);
          }
          catch(err)
          {
            resp.send("err 404");
          }
   })

})

app.get('/data',(req,resp)=>
{
    const que='select * from employee' ;
    
    connection.query(que,(err,result)=>
    {
      try{
        resp.send(result);
      }
      catch(err)
      {
        resp.send(err);
      }
    })
})

app.get('/data/:id',(req,resp)=>
{

    const _id=req.params.id;
 
    const que=`select * from employee where id=${_id}`;
    
    connection.query(que,(err,result)=>
    {
      try{
        resp.send(result);
      }
      catch(err)
      {
        resp.send(err);
      }
    })
})

app.put('/data/:id',(req,resp)=>
{
  const _id=req.params.id;

  //for updating the name
  const change_name=req.body.em_name;
  const que1=`update employee set em_name='${change_name}' where id=${_id}`;
  connection.query(que1,(err,result)=>
  {
      try{
           resp.send(result);
      }
      catch(err)
      {
        resp.send(err);
      }
  })



  //for updating the email
  const change_mail=req.body.em_email;
  const que2=`update employee set em_email='${change_mail}' where id=${_id}`;
  connection.query(que2,(err,result)=>
  {
      try{
           resp.send(result);
      }
      catch(err)
      {
        resp.send(err);
      }
  })


  //change gender
  const change_gender=req.body.em_gender;
  const que3=`update employee set em_gender='${change_gender}' where id=${_id}`;
  connection.query(que3,(err,result)=>
  {
      try{
           resp.send(result);
      }
      catch(err)
      {
        resp.send(err);
      }
  })
})


//delete the rows

app.delete('/data/:id',(req,resp)=>
{
  const _id=req.params.id;

  const que=`delete from employee where id=${_id}`;

  connection.query(que,(err,result)=>
  {
    try{
      resp.send(result);
    }
    catch(err)
    {
      resp.send(err);
    }
  })
})

app.listen(port,()=>
{
    console.log(`server is listening at the port ${port}`);
})