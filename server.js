const express = require("express");
const cors = require("cors");
//EL BODY PARSER PARA OBTENER LOS DATOS DEL REQUEST BODY
const bodyParser = require("body-parser");
const { request, response } = require("express");

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

app.get("/", (request, response) =>{
  response.sendFile(__dirname + "/index.html");
});

//LEVEL 3
//Lack the exercise
app.get("/messages/search", (request, response) => {
  const searchMessage = request.query.search;
  const result = messages.find((mss) => mss.from && mss.text == searchMessage);
  if (result) {
    response.json(result);
  } else {
    response.sendFile(__dirname + "/source/404.html");
  }
});

app.get("/messages/latest", (request, res) => {
  const latestMss = messages.slice(messages.length - 10);
  res.send(latestMss);
});

//LEVEL 1
app.get("/messages", (request, response) => {
  response.status(200).json(messages);
});

app.post("/messages", (request, response) => {
  const newId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 0;
  
  //LEVEL 2
  if (!request.body.from && !request.body.text) {
    response.status(400).json("FALTAN DATOS");
  }

  const newMessage = {
    id: newId,
    ...request.body, //--suggar sintax --
  };
  
  messages.push(newMessage);
  response.status(201).json(newMessage);
});

app.get("/messages/:messages_ID", (request, response) => {
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
