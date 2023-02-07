import express from "express";
import {readFile} from "fs/promises";
import {createConnection} from "mysql";

//https://www.npmjs.com/package/mysql#introduction
const db = createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "videostore"
});
let i =1;
db.connect((err)=>{
    if (err) throw err;
    console.log("Connexion etablit !")
})

let value = JSON.parse(await readFile("./eleves.json"));
console.log(value);

const app = express();

app.use(express.json());

app.post("/", (req, res)=>{
    res.end("Ton hostname est "+req.hostname);
})

app.post("/jv:id", (req, res)=>{
   
    db.query('insert into games (2,',req.params.id,', 1)', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
})

app.get("/getAll", (req, res)=>{

    
    db.query('SELECT * from games', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.json(results);
      });
     
    
    
})

app.get("/get/:firstname", (req, res)=>{
    //renvoi un élève avec un nom saisi
    res.send(req.body);
    let temp = value.eleves.find((e)=>{
        return e.lastname.match(req.params.lastname)
    })
    res.json(temp);
})

app.post("/add", (req, res)=>{
    //ajouter un élève
    res.end(req.body);
    let temp = {
        "id": req.body.id,
        "lastname": req.body.lastname,
        "firstname": req.body.firstname,
        "classe": req.body.class
    }

    value.eleves.push(temp);
    res.json(value.eleves);
})

app.post("/update", (req, res)=> {
    // Mettre à jour un eleve
    // Avec nom, prenom, classe, id
    if(req.body.classe != undefined){
        value.eleves[req.body.id].classe = req.body.classe;
    }
    if(req.body.lastname != undefined){
        value.eleves[req.body.id].lastname = req.body.lastname;
    }
    if(req.body.firstname != undefined){
        value.eleves[req.body.id].firstname = req.body.firstname;
    }
    res.json(value.eleves);
})





app.get("/delete", (req, res)=> {

    connection.connect();
    connection.query('SELECT * from games ', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
      });
     
    connection.end();

})

app.listen(3000, () => {  
    console.log(`Serveur à l'écoute sur le port`)      
})