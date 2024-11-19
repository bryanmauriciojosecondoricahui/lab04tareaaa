const express = require('express');
const app = express();

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Datos de ejemplo para clientes y productos
let clientes = [
    { id: 1, nombre: 'Juan Pérez', email: 'juanperez@mail.com' },
    { id: 2, nombre: 'Ana García', email: 'anagarcia@mail.com' },
    { id: 3, nombre: 'Pedro López', email: 'pedrolopez@mail.com' }
];

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta GET para obtener clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta GET para obtener productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Ruta POST para agregar un cliente
app.post('/clientes', (req, res) => {
    const cliente = req.body;
    cliente.id = clientes.length + 1;
    clientes.push(cliente);
    res.status(201).json(cliente);
});

// Ruta POST para agregar un producto
app.post('/productos', (req, res) => {
    const producto = req.body;
    producto.id = productos.length + 1;
    productos.push(producto);
    res.status(201).json(producto);
});

// Ruta PUT para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const clienteActualizado = req.body;
    clientes[clienteIndex] = { id, ...clienteActualizado };
    res.json(clientes[clienteIndex]);
});

// Ruta PUT para actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productoActualizado = req.body;
    productos[productoIndex] = { id, ...productoActualizado };
    res.json(productos[productoIndex]);
});

// Ruta DELETE para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);

    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    clientes.splice(clienteIndex, 1);
    res.status(204).end();
});

// Ruta DELETE para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);

    if (productoIndex === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos.splice(productoIndex, 1);
    res.status(204).end();
});

// Configuración para el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
