const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('students.sqlite');

const express = require('express');
const app = express();
 
app.get('/', async (req, res)=>{
	const q = `select rowid,fname,lname from students`;
	try{
		const results = await query(q);
		res.send(results);
	}catch(err){
		console.error(err);
		res.append('status','500');
		res.send(err);
	}
})
 
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