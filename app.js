const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');  // Importar la configuración de la base de datos

const usuarioRoutes = require('./routes/usuarioRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const authRoutes = require('./routes/authRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const venderRoutes = require('./routes/venderRoutes');
const publicarRoutes = require('./routes/publicarRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para logging
app.use(morgan('dev'));

// Middleware para análisis de cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar sesiones
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Middleware para pasar usuario a todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/vehiculos', vehiculoRoutes);
app.use('/carrito', carritoRoutes);
app.use('/vender', venderRoutes);
app.use('/publicar', publicarRoutes);
app.use('/publicaciones', publicacionesRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Dashboard' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

app.get('/vehiculos', (req, res) => {
    res.render('vehiculos', { title: 'Vehículos' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Personaliza el mensaje de error
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Algo salió mal en el servidor';

    res.status(statusCode).send(errorMessage);
});

// Sincronizar base de datos y arrancar el servidor
sequelize.sync().then(async () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(err => console.log(err));
