const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://127.0.0.1:27017/kazcom', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const MessageSchema = new mongoose.Schema({
  name: String,
  message: String
})

const Message = mongoose.model('messages', MessageSchema)

const User = mongoose.model('users', UserSchema)

app.post("/login_user", async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password })
  if (!user) {
    res.status(401).redirect('/login')
    return;
  }

  res.status(200).send({name: user.name, email: user.email, password: user.password})
})

app.post("/add_user", async (req, res) => {
  const user_name = await User.findOne({ name: req.body.name })
  if (user_name) {
    res.status(401).redirect('/login')
    return;
  }

  const user_email = await User.findOne({ email: req.body.email })
  if (user_email) {
    res.status(401).redirect('/login')
    return;
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  await newUser.save();
  res.status(200).send({name: newUser.name, email: newUser.email, password: newUser.password})
});


app.post("/chat_history", async (req, res) => {
  const history = await Message.find()
  res.status(200).send({ history })
})

io.on('connection', function(client) {  
  console.log("[] nowy client")
    client.on('sendMessage', async function(data) {
    	  console.log("[" + data.name + "] " + data.message)
        new Message({
          name: data.name,
          message: data.message
        }).save()
        io.emit('getMessage', [{ name: data.name, message: data.message}]);
    })
})



const staticPath = path.join(__dirname, "../dist");
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

server.listen(3000, function(){
  console.log('[] http://localhost:3000');
});