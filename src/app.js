const path = require('path'); 
const express = require('express');
const fs = require('fs');
const app = express();
const dbConnect = require('./config/mongo');

// config
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, '../public')));

//config informacion
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// obteniendo rutas
const main = require('./routes/main'); //requerimos de la carpeta 
app.use('/', main); //nos direcciona al apartado main de router

//obteniendo users
const products = require('./routes/products'); //requerimos de la carpeta 
app.use('/products', products); //nos direcciona al apartado users de router

// crea un txt con las rutas
app.use((req ,res , next) => {
    const url = req.headers.referer;
    fs.appendFileSync('rutas_accedidas.txt', "\n" + url )
    
    next();
})
// agregando not found
app.use((req ,res , next) => {
    res.render('404-page');
})

// conectando a mongoose
dbConnect();

// servidor
app.listen(3000, () => {
    console.log('conectado')
} )

