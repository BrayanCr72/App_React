const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'dbpedido',
  user: 'root',
  password: '',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/listarPedidos', (req, res) => {
  const query = 'SELECT * FROM tbpedido';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ pedidos: results });
  });
});

app.get('/eliminarPedido', (req, res) => {
  const id = req.query.id;
  const query = `DELETE FROM tbpedido WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Pedido eliminado');
  });
});

app.get('/insertarPedido', (req, res) => {
  const { producto, precio, cantidad, fecha, activo } = req.query;
  const query = `INSERT INTO tbpedido( producto, precio, cantidad, fecha, activo) VALUES ('${producto}','${precio}','${cantidad}','${fecha}','${activo}')`;
  
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Pedido insertado');
  });
});

app.get('/modificarPedido', (req, res) => {
  const { id, producto, precio, cantidad, fecha, activo } = req.query;
  const query = `UPDATE tbpedido SET producto='${producto}',precio='${precio}',cantidad='${cantidad}',fecha='${fecha}',activo='${activo}' WHERE id='${id}'`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Pedido modificado');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
