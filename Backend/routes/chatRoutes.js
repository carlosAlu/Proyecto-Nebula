const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const ChatMessage = require("../models/ChatMessage");

const router = express.Router();
const connectedClients = new Set();
const historyLimit = 100;
const nicknamePattern = /^[\p{L}\p{N} _-]{2,32}$/u;

const sendMessageLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Espera un momento antes de enviar más mensajes." }
});

function toPublicMessage(message) {
  return {
    id: message._id.toString(),
    nickname: message.nickname,
    text: message.text,
    createdAt: message.createdAt.toISOString()
  };
}

function publishMessage(message) {
  const event = `data: ${JSON.stringify(toPublicMessage(message))}\n\n`;

  for (const client of connectedClients) {
    if (!client.destroyed) client.write(event);
  }
}

router.get("/stream", async (_req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "El chat no está disponible en este momento." });
  }

  res.status(200);
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no"
  });
  res.flushHeaders();
  connectedClients.add(res);

  const heartbeat = setInterval(() => {
    if (!res.destroyed) res.write(": keep-alive\n\n");
  }, 25000);

  res.on("close", () => {
    clearInterval(heartbeat);
    connectedClients.delete(res);
  });

  try {
    const history = await ChatMessage.find({ expiresAt: { $gt: new Date() } })
      .sort({ createdAt: -1 })
      .limit(historyLimit)
      .lean();

    for (const message of history.reverse()) {
      if (!res.destroyed) res.write(`data: ${JSON.stringify(toPublicMessage(message))}\n\n`);
    }
  } catch (error) {
    console.error("No se pudo abrir el flujo del chat:", error.message);
    connectedClients.delete(res);
    res.end();
  }
});

router.post("/messages", sendMessageLimiter, async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: "El chat no está disponible en este momento." });
  }

  const nickname = typeof req.body?.nickname === "string" ? req.body.nickname.trim() : "";
  const text = typeof req.body?.text === "string"
    ? req.body.text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";

  if (!nicknamePattern.test(nickname)) {
    return res.status(400).json({ error: "El alias de esta sesión no es válido." });
  }

  if (!text || text.length > 1000) {
    return res.status(400).json({ error: "El mensaje debe tener entre 1 y 1000 caracteres." });
  }

  try {
    const message = await ChatMessage.create({
      nickname,
      text,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    const publicMessage = toPublicMessage(message);

    publishMessage(message);
    return res.status(201).json({ message: publicMessage });
  } catch (error) {
    console.error("No se pudo guardar un mensaje del chat:", error.message);
    return res.status(500).json({ error: "No se pudo enviar el mensaje. Inténtalo de nuevo." });
  }
});

module.exports = router;
