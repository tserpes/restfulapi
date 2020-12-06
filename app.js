process.title = 'node_restful';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('students.sqlite');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));
 
app.get('/students/', async (req, res)=>{
	const q = `select rowid,fname,lname from students`;
	try{
		const results = await query(q);
		res.json(results);
	}catch(err){
		console.error(err);
		res.append('status','500');
		res.send(err);
	}
});

app.get('/students/:studentid',async (req,res)=>{
	const q = `select rowid,fname,lname from students where rowid = ${req.params.studentid}`;
	try{
		const results = await query(q);
		res.json(results);
	}catch(err){
		console.error(err);
		res.append('status','500');
		res.send(err);
	}
});

app.post('/students/',(req,res)=>{
	console.log(req.body);
	res.json(req.body);
});

app.listen(80);

function query(q){
	return new Promise(function(resolve, reject){
		db.all(q,(err,rows)=>{
			if(err){
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
}