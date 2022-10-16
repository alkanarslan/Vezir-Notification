const express = require("express");
const app = express();
const port = 3002;

const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth({ clientId: "alkan" }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

app.get("/", (req, res) => {
  var url = require("url");
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (query.mesaj && query.telefon) {
    client.sendMessage("9" + query.telefon + "@c.us", query.mesaj);
  }
  //client.sendMessage("9" + query.telephone + "@c.us", query.message);
  console.log(query);
  res.send(query);
});

app.listen(port, () => {
  client.initialize();
  console.log(`Example app listening on port ${port}`);
});
