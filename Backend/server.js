const path = require("node:path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, ".env") });

// Construye la aplicación Express y limita el origen autorizado para peticiones con cookies.
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
app.disable("x-powered-by");

function isPrivateLanOrigin(origin) {
    let parsedOrigin;
    try {
        parsedOrigin = new URL(origin);
    } catch {
        return false;
    }

    if (parsedOrigin.protocol !== "http:" || !["5173", "8080"].includes(parsedOrigin.port)) {
        return false;
    }

    const octets = parsedOrigin.hostname.split(".").map(Number);
    if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) {
        return false;
    }

    return octets[0] === 10
        || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
        || (octets[0] === 192 && octets[1] === 168);
}

const frontendOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(cors({
    origin(origin, callback) {
        const isConfiguredOrigin = frontendOrigins.includes(origin);
        const isLocalDevelopmentOrigin = origin === "http://localhost:5173"
            || origin === "http://localhost:8080"
            || origin === "http://127.0.0.1:5173"
            || origin === "http://127.0.0.1:8080";

        if (!origin || isConfiguredOrigin || isLocalDevelopmentOrigin || isPrivateLanOrigin(origin)) {
            return callback(null, true);
        }

        return callback(null, false);
    },
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
app.use("/api/chat", chatRoutes);

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