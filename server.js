/*
function callback(){
    console.log('calling callback func');
}

const add = (a,b, callback) => {
    var result = a+b;
    console.log(result);
    callback();
}

add(2, 93, callback);
*/

/*
let fs = require('fs');
let os = require('os');

let user = os.userInfo();
console.log(user);

fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', ()=>{
    console.log('file is created')
});
*/

/*
const notes = require('./notes.js');
const _ = require('lodash');
console.log('server file is available');

var age = notes.age;
console.log(age);

let arr = [1, 2, 3, 4, 1, 2, 3];
console.log(_.uniq(arr));
*/

/*
let jsonString = '{"name": "Jon", "age": 20, "city": "winterfell"}';
let jsonObj = JSON.parse(jsonString);
console.log(jsonObj.name);

let objToConvert = {
    "name": "Arya", 
    "age": 16, 
    "city": "winterfell"
}
let jsonStringified = JSON.stringify(objToConvert);
console.log(jsonStringified);

console.log(typeof jsonObj);
console.log(typeof jsonStringified);
*/

/*
const express = require('express');
const app = express();

app.get('/', function(req,res){
    res.send('Welcome to hotel');
});

app.get('/idli', (req,res)=>{
    let idli = {'name': 'rava idli', 'size': '10cm diameter'};
    res.send(idli);
})

app.get('/dosa', (req,res)=>{
    res.send("Dosa is being prepared");
})

app.post('/items', (req,res)=>{
    res.send('data is saved');
})

app.listen(3000);
*/

const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');

app.get('/', function(req,res){
    res.send('Welcome to hotel');
});

const personRoutes = require('./routes/personRoutes.js');

app.use('/person', personRoutes);

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})