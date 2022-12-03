const express = require("express");
const cors = require("cors");
//EL BODY PARSER PARA OBTENER LOS DATOS DEL REQUEST BODY
const bodyParser = require("body-parser");
const { request } = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.status(200).json(messages);
});

app.post("/messages", (request, response) => {
  const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 0;
  const newMessage = {
    id: newId,
    ...request.body, //--suggar sintax --
  };
  if(newMessage == request.body > 0){
    response.status(400).json(newMessage);
  }
  messages.push(newMessage);
  response.status(201).json(newMessage);
});

app.get("/messages/:messages_ID", function (request, response) {
  const messagesId = request.params.messages_ID;
  const result = messages.find((m) => m.id == messagesId);
  if (result) {
    response.status(200).json(result);
  } else {
    //response.status(404).send("NOT FOUND");
    response.sendFile(__dirname + "/source/404.html");
  }
});

app.delete("/messages/:messages_ID", (request, response) => {
  const messagesId = request.params.messages_ID;
  const messagesIdx = messages.findIndex((mes) => mes.id == messagesId);
  if (messagesIdx > -1) {
    messages.splice(messagesIdx, 1);
    response.status(200).send(quotes);
  } else {
    response.sendFile(__dirname + "/source/404.html");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
