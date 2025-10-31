import express from "express";

const app = express();
app.use(express.json());

// GET simples para health-check (opcional)
app.get("/", (req, res) => res.send("OK"));

// ✅ Validação do webhook da Meta
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "lucasToken";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge); // devolve o challenge cru
  }
  return res.sendStatus(403);
});

// ✅ Recebimento de notificações (mensagens, status, etc.)
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recebido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Webhook online na porta ${PORT}`));
