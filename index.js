import express from "express";

const app = express();
app.use(express.json());

// Health-check
app.get("/", (req, res) => res.send("OK"));

// ✅ Validação do Webhook
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "lucasToken";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("🔗 Webhook validado com sucesso!");
    return res.status(200).send(challenge); // devolve o challenge cru
  } else {
    return res.sendStatus(403);
  }
});

// ✅ Receber eventos do WhatsApp
app.post("/webhook", (req, res) => {
  console.log("📩 Evento recebido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(process.env.PORT || 10000, () =>
  console.log(`🚀 Webhook online na porta ${process.env.PORT || 10000}`)
);
