const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    password: 'password',
    host:'localhost',
    database:"employeesystem"
});

app.post('/create',(req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('Insert into employees(name,age,country,position,wage) values (?,?,?,?,?)',
        [name,age,country,position,wage],
        (err,result) => {
            if(err) console.log(err);
            else res.send("Values Inserted");
        }
    )
});

app.get("/employee",(req,res)=>{
    db.query("Select * from employees",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result);
        }
    });
})

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("update employees set wage=? where id=?",
        [wage,id],
        (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.query("delete from employees where id=?",[id],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.listen(3001,()=>{
    console.log("yay, your server is running on port: 3001");
})