const express = require('express');
const mysql = require('mysql');
//Create connection
const db = mysql.createConnection({
  host  : 'localhost',
  user  : 'me',
  password : 'secret',
  
});

//connect
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log("My sql connected")
})



const app = express();

//Create database
app.get('/createdb', (req,res) =>{
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err,result) => {
    if(err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});


//Create table
app.get('/createposttable',(req,res) =>{
  let  sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255) PRIMARY KEY (id))';
  db.query(sql, (err,result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post table created...');
  });
});


// Insert posts

app.get('/addpost1',(req,res) =>{
  let post = {title: 'Post One',body:'This is post number one'};
  let sql = 'INSERT INTO posts set'
  let query = db.query(sql,post, (err,result)=>{
    if (err) throw err;
    console.log(result);
    res.send('Post table created...');
  })
})

//Get post
app.get('/getpost',(req,res) =>{
  
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err,results)=>{
    if (err) throw err;
    console.log(results);
    res.send('Post fetched...');
  })
})

app.get('/getpost/:id',(req,res) =>{
  
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,result)=>{
    if (err) throw err;
    console.log(result);
    res.send('Post fetched...');
  })
})

//Update Post

app.get('/updatepost/:id',(req,res) =>{
  let newTitle = 'Updated Title';

  let sql = `UPDATE posts SET title = '${newTitle}'WHERE Id = ${req.params.id}`;
  let query = db.query(sql, (err,results)=>{
    if (err) throw err;
    console.log(results);
    res.send('Post fetched...');
  })
})
app.get('/deletepost/:id',(req,res) =>{
  let newTitle = 'Updated Title';

  let sql = `DELETE FROM WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err,results)=>{
    if (err) throw err;
    console.log(results);
    res.send('Post deleted...');
  })
})



app.listen('3000', () =>{
  console.log('Server started on port 3000');
});
