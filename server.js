import express, { Router } from "express";
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import cookieParser from "cookie-parser";
import Jwt from 'jsonwebtoken';

dotenv.config();

import subjectsRouter from './routes/subjects.js';
import subRouter from './routes/sub.js';
import authRoutes from './routes/auth.js';
import studRoutes from './routes/stud.js';
// import { authentication } from './middleware/authentication.js';
//import departmentsRouter from "./routes/department.js";

const router = new Router();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
mongoose.connect(process.env.mongoURL);

/*function f (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      { name: 'Computer Science', code: 'CS'},
      { name: 'Information Technology', code: 'IT'},
      {  name: 'Information System', code: 'IS'},
      { name: 'Artificial Iintelligence', code: 'AI'},
    ];
    dbo.collection("departments").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  };*/

/*app.get('/subjects',function(req,res)){
mongoose.Query('SELECT * DISTINCT name FROM subjects ORDER BY name ASC' , function(error , data ) {
    res.render('subjects',)
})};*/

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templetes');

//app.get('/subjects',(req,res) => {
// res.render('departments/all')
//})

app.use('/', studRoutes);
app.use('/showSubjects', subRouter);
app.use('/', authRoutes);
app.use('/subjects', subjectsRouter);
//app.use('/department',departmentsRouter);


app.listen(process.env.port, '127.0.0.1', () => {
    console.log("running");
})