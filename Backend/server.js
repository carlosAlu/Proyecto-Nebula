const path = require("node:path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

const databaseStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
};

app.get("/", (_req, res) => {
    res.json({
        service: "nebula-api",
        status: "running",
        health: "/health"
    });
});

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

app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

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

if (require.main === module) {
    startServer();
}

module.exports = { app, startServer };