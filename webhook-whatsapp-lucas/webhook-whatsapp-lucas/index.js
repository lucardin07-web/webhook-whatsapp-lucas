import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Servidor rodando com sucesso!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Servidor online na porta ${process.env.PORT || 3000}`);
});
