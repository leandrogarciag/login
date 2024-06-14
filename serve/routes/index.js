const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../config/database');
const path = require('path')
const jwt = require('jsonwebtoken');
require('dotenv').config({path:path.resolve(__dirname, '../.env')})


const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_NAME;

app.use(bodyParser.json());



app.use(async(req, res, next) => {
try {
    const sql = `SELECT * FROM ${DB}.users `;
    let [result] = await connection.promise().query(sql);
    if(result.length >= 1)
    {
        next();
    }else
    {
        res.status(401).json("Acceso denegado")
    }
} catch (error) {
    console.log("Ocurrio un error al momento de autenticar al usuario en API : "+error);
    res.status(401).json("Error contacte al administrador del sistema",error);
}
});

app.post('/login',async (req, res) => {
    const { username, password } = req.body;
    console.log('>> username',username);
    console.log('>> password',password);
    const sql = `SELECT * FROM ${DB}.users where username=? and password=?`;
    let [result] = await connection.promise().query(sql,[username,password]);
    console.log('>>result',result);
    if(result.length >= 1){
        
        const token = jwt.sign({ id: result.id, username: result.username }, 'jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
 
    }else{
        
        res.status(401).json({ error: 'credenciales incorrectas' });
    }
    // console.log('jwt',jwt);
    
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
