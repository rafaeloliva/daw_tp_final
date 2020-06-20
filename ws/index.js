var PORT=3000;
var express = require('express');
var app = express();
var mysql = require('./mysql');
app.use(express.json()); // para parsear application/json
app.use(express.static('.')); // para servir archivos estaticos


//EJ 12 - modificamos para que un get responda por tipo, no solo por id
// este es el original por id
app.get('/devices/:id', function(req, res, next) {
    mysql.query('SELECT * FROM Devices WHERE id=?', [req.params.id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(rta);
    });
});
// este el modificado por tipo
app.get('/ws/devices', function(req, res, next) {
    var tipo ='';
    switch(req.query.filter){
        case '1':
            tipo = ' WHERE type=0';
            break;
        case '2':
            tipo = ' WHERE type=1';
            break;
        default:
            break;
    }
    mysql.query('SELECT * FROM Devices'+tipo, function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(rta); //.status(200);
    });
});
app.post('/devices', function(req, res, next) {

    console.log(req.body);

    st=0;
    if(req.body.state)
        st=1;

    id = req.body.id.split("_")[1]; // viene dev_xx

    mysql.query('UPDATE Devices SET state=? WHERE id=?', [st, id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(JSON.stringify(req.body));
    });
});


app.listen(PORT, function(req, res) {
    console.log("API funcionando en el puerto "+PORT);
});