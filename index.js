const express = require("express");
const app = express();

app.use(express.json());

let scripts = {};

function gerarId() {
  return Math.random().toString(36).substring(2, 10);
}

app.post("/gerar", (req, res) => {
  const script = req.body.script;

  if (!script) {
    return res.status(400).json({ erro: "Sem script" });
  }

  const id = gerarId();
  scripts[id] = script;

  res.json({ link: "/script/" + id });
});

app.get("/script/:id", (req, res) => {
  const script = scripts[req.params.id];

  if (!script) {
    return res.status(404).send("Acesso negado");
  }

  const userAgent = req.headers["user-agent"] || "";

  if (userAgent.includes("Mozilla")) {
    return res.status(403).send("Acesso negado");
  }

  res.setHeader("Content-Type", "text/plain");
  res.send(script);
});

app.listen(process.env.PORT || 10000);
