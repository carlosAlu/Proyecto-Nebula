const path = require("node:path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, ".env") });

// Construye la aplicación Express y limita el origen autorizado para peticiones con cookies.
const authRoutes = require("./routes/authRoutes");
const app = express();
app.disable("x-powered-by");
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cors({
    origin: frontendOrigin,
    credentials: true
}));
app.use(express.json());

const databaseStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
};

// Ruta raíz informativa para comprobar que el proceso HTTP está activo.
app.get("/", (_req, res) => {
    res.json({
        service: "nebula-api",
        status: "running",
        health: "/health"
    });
});

// Indica si la API puede atender operaciones que dependen de MongoDB.
app.get("/health", (_req, res) => {
    const databaseStatus = databaseStates[mongoose.connection.readyState] || "unknown";
    const isDatabaseConnected = databaseStatus === "connected";

    res.status(isDatabaseConnected ? 200 : 503).json({
        service: "nebula-api",
        status: isDatabaseConnected ? "ok" : "degraded",
        database: {
            status: databaseStatus
        }
    });
});

// Monta los endpoints de autenticación bajo un prefijo común.
app.use("/api/auth", authRoutes);

// Responde con un error consistente cuando no existe una ruta solicitada.
app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Conecta Mongoose a la URI privada cargada desde el entorno del backend.
async function connectDatabase() {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGODB_URI no está configurada; el servidor iniciará sin conexión a MongoDB.");
        return;
    }

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("MongoDB conectado.");
    } catch (error) {
        console.error("No se pudo conectar a MongoDB:", error.message);
    }
}

// Inicia el servidor HTTP y comienza la conexión a la base de datos.
function startServer() {
    const port = Number(process.env.PORT) || 3000;
    const server = app.listen(port, () => {
        console.log(`Nebula API ejecutándose en el puerto ${port}.`);
    });

    server.on("error", (error) => {
        console.error("No se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    });

    void connectDatabase();
    return server;
}

// Permite importar la aplicación en pruebas sin abrir automáticamente un puerto.
if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };